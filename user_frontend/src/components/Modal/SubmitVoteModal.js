import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Grid from "@mui/material/Grid"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function SubmitVoteModal(props) {

    const {
        handleCloseModal,
        openModal,
        selectedCandidates,
        election_id,
        setUserVoted,
        setPageNotify
    } = props

    const navigate = useNavigate()
    const [searchParams, _] = useSearchParams()
    const face_reco_token = searchParams.get('face_reco_token')


    const handleVoteSubmit = async () => {

        try {

            const token = localStorage.getItem('token')

            await axios.get("http://" + process.env.REACT_APP_ELECTION_SERVICE_HOST + "/users/is/auth", {
                headers: { Authorization: 'Bearer ' + token }
            })

            localStorage.setItem('helded_vote', JSON.stringify({
                candidates: selectedCandidates,
                election_id: election_id
            }))

            handleCloseModal()

            window.location.href = "https://" + process.env.REACT_APP_FACE_FRONTEND_HOST + "/verf/?user_id=" + localStorage.getItem("user_id") + "&election_id=" + election_id

            // const res = await axios.post("http://"+process.env.REACT_APP_VOTE_SERVICE_HOST+"/votes/submit", 
            // {
            //     election_id,
            //     candidates: [...selectedCandidates]
            // },
            // {
            //     headers:{Authorization: 'Bearer ' + token}
            // })

            // setUserVoted(true)
            // handleCloseModal()

        } catch (err) {

            if (!err.response) {
                navigate("/")
                setPageNotify({ message: 'Server error', status: 'error' })
                return
            }
            if (err.response.status === 403) {
                navigate('/auth/login/?redirect=/elections/' + election_id + "/")
            } else if (err.response.status === 404) {
                navigate("/404")
            }
            console.log(err)
        }
    }

    useEffect(() => {

        if (face_reco_token) {

            const submitVote = async () => {

                try {

                    const token = localStorage.getItem('token')
                    const vote = JSON.parse(localStorage.getItem('helded_vote'))

                    if(!vote || !vote.election_id || vote.election_id !== election_id.toString() || vote.candidates.length === 0){
                        return
                    }

                    await axios.post("http://" + process.env.REACT_APP_VOTE_SERVICE_HOST + "/votes/submit",
                        {
                            election_id: parseInt(vote.election_id),
                            candidates: vote.candidates,
                            face_reco_token
                        },
                        {
                            headers: { Authorization: 'Bearer ' + token }
                        })
                        window.location.href = "http://" + process.env.REACT_APP_HOST + "/elections/"+vote.election_id
                } catch (err) {
                    if (!err.response) {
                        navigate("/")
                        setPageNotify({ message: 'Server error', status: 'error' })
                        return
                    }
                    if(err.response.status === 400){
                        setPageNotify({message: "Face ID verification failed", status: 'error'})
                        return
                    }
                    if (err.response.status === 403) {
                        navigate('/auth/login/?redirect=/elections/' + election_id + "/")
                    } else if (err.response.status === 404) {
                        navigate("/404")
                    }
                    console.log(err)
                }
            }

            submitVote()
        }

    }, [])


    return (
        <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>Vote confirmation</DialogTitle>
            <DialogContent style={{ width: 450 }}>
                <DialogContentText>
                    Are you sure you want to vote for the selected candidates?

                    <br></br>
                    <br></br>
                </DialogContentText>
            </DialogContent>
            <DialogActions>

                <Button onClick={handleCloseModal} color="primary" style={{ backgroundColor: '#901A1A', color: 'white' }}>
                    Cancel
                </Button>
                <Button onClick={handleVoteSubmit} color="primary" style={{ backgroundColor: '#004378', color: 'white' }}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}
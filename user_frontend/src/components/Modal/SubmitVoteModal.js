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

    function setCookie(name, value, daysToExpire) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + daysToExpire);
      
        const cookieValue = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; expires=' + expirationDate.toUTCString() + '; path=/';
      
        document.cookie = cookieValue;
      }
      
      function getCookie(name) {
        const cookieName = encodeURIComponent(name) + '=';
        const cookieArray = document.cookie.split(';');
      
        for (let i = 0; i < cookieArray.length; i++) {
          const cookie = cookieArray[i].trim();
          if (cookie.indexOf(cookieName) === 0) {
            return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
          }
        }
      
        return null;
      }


    const handleVoteSubmit = async () => {

        try {

            const token = localStorage.getItem('token')

            await axios.get("http://" + process.env.REACT_APP_ELECTION_SERVICE_HOST + "/users/is/auth", {
                headers: { Authorization: 'Bearer ' + token }
            })

            const combinedValue = JSON.stringify({ token, cands:selectedCandidates });

            setCookie('cypVote-session', combinedValue, 7);

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

                    const retrievedValue = getCookie('cypVote-session');

                    const { token, cands } = JSON.parse(retrievedValue);

                    localStorage.setItem("token",token)
                    if(cands.length === 0){
                        return
                    }

                    await axios.post("http://" + process.env.REACT_APP_VOTE_SERVICE_HOST + "/votes/submit",
                        {
                            election_id: parseInt(election_id),
                            candidates: cands,
                            face_reco_token
                        },
                        {
                            headers: { Authorization: 'Bearer ' + token }
                        })

                        window.location.href = "http://" + process.env.REACT_APP_HOST + "/elections/"+election_id
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
                    if(err.response.status === 500){
                        setPageNotify({message: "Face ID verification failed", status: 'error'})
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
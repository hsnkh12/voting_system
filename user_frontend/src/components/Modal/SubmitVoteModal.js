import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Grid from "@mui/material/Grid"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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


    const handleVoteSubmit = async () => {
        // Later redirect to face id reco, for now, just submit the vote 

        try {

            const token = localStorage.getItem('token')

            const res = await axios.post("http://"+process.env.REACT_APP_VOTE_SERVICE_HOST+"/votes/submit", 
            {
                election_id,
                candidates: [...selectedCandidates]
            },
            {
                headers:{Authorization: 'Bearer ' + token}
            })

            setUserVoted(true)
            handleCloseModal()

        } catch (err) {

            if(!err.response){
                navigate("/") 
                setPageNotify({message: 'Server error', status:'error'})
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
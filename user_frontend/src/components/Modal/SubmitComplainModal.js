import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Grid from "@mui/material/Grid"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';
import TextField from '@mui/material/TextField';

export default function SubmitComplainModal(props) {

    const {
        openModal,
        handleCloseModal,
        election_id,
        setPageNotify
    } = props

    const [formValues, setFormValues] = useState({
        election_id: election_id,
        message: ""
    })

    const navigate = useNavigate()

    const handleFormChange = (e) => {
        const prev = { ...formValues }
        prev.message = e.target.value
        setFormValues(prev)
    }

    const submitComplain = async () => {

        try {

            const token = localStorage.getItem("token")

            await axios.post("http://"+process.env.REACT_APP_ELECTION_SERVICE_HOST+"/complains", formValues, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            setPageNotify({message:"Complain has been submitted", status: "success"})
            handleCloseModal()
            setFormValues({election_id, message: ""})


        } catch (err) {
            if (!err.response) {
                navigate("/")
                setPageNotify("Server error", "error")
                return
            }
            if (err.response.status === 403) {
                navigate('/auth/login/?redirect=/elections/results/' + election_id + "/")
            } else if (err.response.status === 404) {
                navigate("/404")
            }
            setPageNotify(err.response.data.message, "error")
            console.log(err)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        submitComplain()
    }


    return (<Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Complain submission</DialogTitle>
        <DialogContent style={{ width: 450 }}>
            <form onSubmit={handleFormSubmit}>
                <TextField
                    label={"Message"}
                    type="text"
                    variant="outlined"
                    name={"message"}
                    value={formValues.message}
                    required
                    onChange={handleFormChange}
                    style={{ backgroundColor: 'white', borderRadius: 5 }}
                    fullWidth
                />

            <br></br>
            <br></br>
            <Button  onClick={handleCloseModal} color="primary" style={{ backgroundColor: '#901A1A',marginRight:10 ,color: 'white' }}>
                Cancel
            </Button>
            <Button type="submit" color="primary" style={{ backgroundColor: '#004378', color: 'white' }}>
                Confirm
            </Button>

        </form>
    </DialogContent>

    </Dialog >)
}
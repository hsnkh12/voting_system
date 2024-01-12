import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import dvs_image4 from '../../assets/dvs_image4.jpeg'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import NotificationMessage from '../../components/Notification/NotificationMessage';
export default function Section4() {

    const [formValues, setFormValues] = useState({
        email: null,
        message: null
    })

    const [ notify, setNotify] = useState({ message: null, status: null})

    const handleFormChange = (e) =>{
        const value = e.target.value 
        const prev = {...formValues}
        prev[e.target.name] = value 
        setFormValues(prev)
    }

    const sendEmail = async () => {

        try{

            await axios.post("http://"+process.env.REACT_APP_ELECTION_SERVICE_HOST+"/users/contact/us",formValues)
            setNotify({message: 'Message has been sent', status:'success'})
        } catch(err){
            console.log(err)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        sendEmail()
    }

    return (
        <div style={{ backgroundColor: '#EEF7FF' }}>
            <Container style={{ paddingTop: 60 }}>
                <Grid container spacing={2}>
                    <Grid item container xs={12} md={5} lg={5}>
                        <img src={dvs_image4} alt='img' />
                    </Grid>

                    {/* Spacer */}
                    <Grid item xs={12} md={2} lg={2}></Grid>

                    {/* Form Section */}
                    <Grid item container xs={12} md={5} lg={5} alignItems="center">
                        <form onSubmit={handleFormSubmit}>
                        <Grid container spacing={2}>

                            {/* Email Field */}
                            <Grid item xs={12} md={10} lg={10}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    style={{ backgroundColor: 'white', borderRadius: 5 }}
                                    fullWidth
                                    size='large'
                                    name='email'
                                    value={formValues.email}
                                    onChange={handleFormChange}
                                    required
                                />
                            </Grid>

                            {/* Full Name Field */}
                            <Grid item xs={12} md={10} lg={10}>
                                <TextField
                                    label="Full Name"
                                    variant="outlined"
                                    style={{ backgroundColor: 'white', borderRadius: 5 }}
                                    fullWidth
                                    size='large'
                                />
                            </Grid>

                            {/* Message Field */}
                            <Grid item xs={12} md={10} lg={10}>
                                <TextareaAutosize
                                    placeholder="Message"
                                    style={{ width: '96%', padding: 10, fontSize: 16 ,backgroundColor: 'white', height: 200, border: '1px solid rgba(0, 0, 0, 0.23)' }}
                                    name='message'
                                    value={formValues.message}
                                    onChange={handleFormChange}
                                    required
                                />
                            </Grid>
                            <NotificationMessage
                                    status={notify.status}
                                    message= {notify.message}
                                    setNotify={setNotify}
                                />

                            {/* Send Button */}
                            <Grid item container xs={12} md={10} lg={10} alignItems="start">
                                <Button size="large" type={'submit'} style={{ width: 100, backgroundColor: '#004378', color: 'white', textTransform: 'none' }}>
                                    Send
                                </Button>
                            </Grid>

                        </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NotificationMessage from '../../../components/Notification/NotificationMessage';
export default function ChangePassword() {


    const [formValues, setFormValues] = useState({
        current_password: '',
        new_password: ''
    })
    const [ notify, setNotify] = useState({ message: null, status: null})
    const navigate = useNavigate()

    const updatePassword = async () => {
        try{

            const token = localStorage.getItem('token')

            await axios.post("http://"+process.env.REACT_APP_ELECTION_SERVICE_HOST+"/users/update-password",{
                ...formValues
            },
            {
                headers:{
                    Authorization: 'Bearer '+token
                }
            })

            navigate('/auth/profile/')
        } catch(err){
            if (err.response.status === 403) {
                navigate('/auth/login/?redirect=/auth/profile/')
            } else if (err.response.status === 404) {
                navigate("/404")
            }
            const message = err.response.data.message? err.response.data.message: "Server error"
            setNotify({message: message, status: 'error'})
            console.log(err)
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value 
        const prev = {...formValues}
        prev[e.target.name] = value 
        setFormValues(prev)
    }

    const handleFormSubmit = (e) =>{
        e.preventDefault()
        updatePassword()
    }

    return (
        <div style={{ backgroundColor: '#004378' }} >
            <Container style={{ paddingTop: 100, height: '85vh' }}>

                <Grid container justifyContent={'center'}>
                    <Grid item xs={12} sm={5} md={5}>

                        <form onSubmit={handleFormSubmit}>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <p style={{ fontSize: 25, color: 'white' }}>Password reset</p>
                                    <hr style={{ color: '#7B7B7B', borderWidth: 0.4 }}></hr>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Current password"
                                        variant="outlined"
                                        type={'password'}
                                        name={'current_password'}
                                        value={formValues.current_password}
                                        required
                                        onChange={handleFormChange}
                                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="New password"
                                        variant="outlined"
                                        name={'new_password'}
                                        value={formValues.new_password}
                                        onChange={handleFormChange}
                                        required
                                        type={'password'}
                                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                                        fullWidth
                                    />
                                </Grid>
                                <NotificationMessage
                                    status={notify.status}
                                    message= {notify.message}
                                    setNotify={setNotify}
                                />
                                <Grid item xs={12} mt={2}>
                                    <Button type={'submit'} size={'large'} style={{ backgroundColor: '#1B639E', width: 150, color: 'white', textTransform: 'none' }}>Confirm</Button>
                                </Grid>
                            </Grid>

                        </form>
                    </Grid>
                </Grid>

            </Container>

        </div>
    )
}
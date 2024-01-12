import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import { useAuth } from '../../../contexts/auth';
import { useEffect, useState } from 'react';
import NotificationMessage from '../../../components/Notification/NotificationMessage';
import { useSearchParams } from 'react-router-dom';

export default function Signin() {

    
    const { authenticateUser } = useAuth()
    const [searchParams, _] = useSearchParams()
    const [ notify, setNotify] = useState({ message: null, status: null})
    const [formValues, setFormValues] = useState({
        email: null,
        password: null
    })

    const redirectUrl = searchParams.get('redirect')? searchParams.get('redirect'): "/elections/"

    const handleFormValueChange = (e) => {
        e.preventDefault()
        const value = e.target.value

        const prevFormValues = { ...formValues }

        prevFormValues[e.target.name] = value
        setFormValues(prevFormValues, redirectUrl)
    }

    const handleFormSubmit = async (e) => {

        e.preventDefault()

        try {
            await authenticateUser(formValues, redirectUrl)
        } catch(err) {

            const message = err.response.data.message? err.response.data.message: "Server error"
            setNotify({message: message, status: 'error'})
        }


    }


    return (
        <div style={{ backgroundColor: '#004378' }} >
            <Container style={{ paddingTop: 100, height: '85vh' }}>

                <Grid container justifyContent={'center'}>
                    <Grid item xs={12} sm={5} md={5}>

                        <form onSubmit={handleFormSubmit}>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <p style={{ fontSize: 25, color: 'white' }}>Login to CypVote</p>
                                    <hr style={{ color: '#7B7B7B', borderWidth: 0.4 }}></hr>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        type={'email'}
                                        variant="outlined"
                                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                                        name={'email'}
                                        value={formValues.email}
                                        onChange={handleFormValueChange}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Password"
                                        type={'password'}
                                        variant="outlined"
                                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                                        name={'password'}
                                        value={formValues.password}
                                        onChange={handleFormValueChange}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <NotificationMessage
                                    status={notify.status}
                                    message= {notify.message}
                                    setNotify={setNotify}
                                />
                                <Grid item xs={12} mt={2}>
                                    <Button style={{ color: 'white', textDecoration: 'underline' }}>Forgot password?</Button>
                                </Grid>
                                <Grid item xs={12} mt={2}>
                                    <Button type={'submit'} size={'large'} style={{ backgroundColor: '#1B639E', width: 150, color: 'white', textTransform: 'none' }}>Submit</Button>
                                </Grid>
                            </Grid>

                        </form>
                    </Grid>
                </Grid>

            </Container>

        </div>
    )
}
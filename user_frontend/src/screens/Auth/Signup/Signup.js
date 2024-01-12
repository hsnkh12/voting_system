import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import { useAuth } from '../../../contexts/auth';
import { useState } from 'react';
import NotificationMessage from '../../../components/Notification/NotificationMessage';
import { useSearchParams , useNavigate} from 'react-router-dom';
export default function Signup() {


    const { registerUser} = useAuth()
    const navigate = useNavigate()
    const [ notify, setNotify] = useState({ message: null, status: null})
    const [searchParams, _] = useSearchParams()
    const redirectUrl = searchParams.get('redirect')? searchParams.get('redirect'): "/elections/"


    const [formValues, setFormValues] = useState({
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        phone_number: null,
        password: null
    })

    const handleFormValueChange = (e) => {

        const value = e.target.value

        const prevFormValues = {...formValues}

        prevFormValues[e.target.name] = value 

        setFormValues(prevFormValues)
    }

    const handleFormSubmit = async (e) => {

        try{
        e.preventDefault()
        await registerUser(formValues, redirectUrl)
        } catch(err){
            const message = err.response.data.message? err.response.data.message: "Server error"
            setNotify({message: message, status: 'error'})
        }
    }

    return (
        <div style={{ backgroundColor: '#004378' }} >
            <Container style={{ paddingTop: 50 }}>

                <Grid container justifyContent={'center'}>
                    <Grid item xs={12} sm={5} md={5}>

                        <form onSubmit={handleFormSubmit}>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <p style={{fontSize: 25, color:'white'}}>Register to CypVote</p>
                                    <hr style={{ color: '#7B7B7B', borderWidth: 0.4 }}></hr>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Username"
                                        variant="outlined"
                                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                                        fullWidth
                                        required
                                        name={'username'}
                                        onChange={handleFormValueChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        type={'email'}
                                        variant="outlined"
                                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                                        fullWidth
                                        required
                                        name={'email'}
                                        onChange={handleFormValueChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="First name"
                                        variant="outlined"
                                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                                        fullWidth
                                        required
                                        name={'first_name'}
                                        onChange={handleFormValueChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Last name"
                                        variant="outlined"
                                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                                        fullWidth
                                        required
                                        name={'last_name'}
                                        onChange={handleFormValueChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Phone number"
                                        variant="outlined"
                                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                                        fullWidth
                                        required
                                        name={'phone_number'}
                                        onChange={handleFormValueChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Password"
                                        type={'password'}
                                        variant="outlined"
                                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                                        fullWidth
                                        required
                                        name={'password'}
                                        onChange={handleFormValueChange}
                                    />
                                </Grid>
                                <NotificationMessage
                                    status={notify.status}
                                    message= {notify.message}
                                    setNotify={setNotify}
                                />
                                <Grid item xs={12} mt={2}>
                                <Grid item xs={12} mt={2}>
                                    <Button style={{ color: 'white', textDecoration: 'underline' }} onClick={ () => navigate("/auth/login/")}>Already have an account?</Button>
                                </Grid>
                                    <Button type={'submit'} size={'large'} style={{ backgroundColor: '#1B639E', width: 150, color: 'white', textTransform: 'none', marginBottom: 30 }}>Submit</Button>
                                </Grid>
                            </Grid>

                        </form>
                    </Grid>
                </Grid>

            </Container>

        </div>
    )
}
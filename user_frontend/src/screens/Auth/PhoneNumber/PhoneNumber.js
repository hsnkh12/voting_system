import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import { useAuth } from '../../../contexts/auth';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import NotificationMessage from '../../../components/Notification/NotificationMessage';
import { useSearchParams } from 'react-router-dom';
export default function PhoneNumber(props){

    const {verifySMSCode, signOut} = useAuth()

    const {setPageNotify} = props

    const [ notify, setNotify] = useState({ message: null, status: null})
    const [searchParams, _] = useSearchParams()
    const redirectUrl = searchParams.get('redirect')? searchParams.get('redirect'): "/elections/"
    const new_phone_number = searchParams.get('new_phone_number')
    const navigate = useNavigate()


    const [formValues, setFormValues] = useState({
        code : null
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
        await verifySMSCode(formValues.code, redirectUrl, new_phone_number, setPageNotify)
        } catch(err){
            if (err.response.status === 403) {
                navigate('/auth/login/?redirect=/auth/profile/&phone_number_change=true')
            } 
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
                                    <p style={{ fontSize: 25, color: 'white' }}>Phone number verification</p>
                                    <hr style={{ color: '#7B7B7B', borderWidth: 0.4 }}></hr>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="SMS code"
                                        variant="outlined"
                                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                                        fullWidth
                                        name= {'code'}
                                        value = {formValues.code}
                                        required
                                        onChange={handleFormValueChange}
                                    />
                                </Grid>
                                <NotificationMessage
                                    status={notify.status}
                                    message= {notify.message}
                                    setNotify={setNotify}
                                />
                                <Grid item xs={12} mt={2}>
                                    <Button type={'submit'}  size={'large'} style={{ backgroundColor: '#1B639E', width: 150, color: 'white', textTransform: 'none', marginRight: 5}}>Verify</Button>
                                </Grid>
                            </Grid>

                        </form>
                    </Grid>
                </Grid>

            </Container>

        </div>
    )
}
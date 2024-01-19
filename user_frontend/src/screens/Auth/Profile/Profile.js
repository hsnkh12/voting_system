import Container from '@mui/material/Container'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import CardActions from '@mui/material/CardActions'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NotificationMessage from '../../../components/Notification/NotificationMessage';
import { useSearchParams } from 'react-router-dom';
export default function Profile(props) {

    const { setPageNotify } = props
    const [searchParams, _] = useSearchParams()
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState(null)
    const [faceVerified, setFaceVerified] = useState(false)
    const [notify, setNotify] = useState({ message: null, status: null })
    const face_reco_token = searchParams.get('face_reco_token')


    const fetchUser = async () => {
        try {

            const token = localStorage.getItem('token')

            const res = await axios.get("http://" + process.env.REACT_APP_ELECTION_SERVICE_HOST + "/users/user/profile",
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })

            const data = res.data
            setFaceVerified(data.face_id_verified)
            delete data.face_id_verified
            setFormValues(data)

        } catch (err) {
            if (!err.response) {
                console.log(err)
                setPageNotify({ message: "Server error", status: "error" })
                navigate("/")
                return
            }
            if (err.response.status === 403) {
                if (localStorage.getItem('token')) {
                    setPageNotify({ message: 'Session has been expired', status: 'warning' })
                }
                navigate('/auth/login/?redirect=/auth/profile/')
            } else if (err.response.status === 404) {
                navigate("/404")
            }
            const message = err.response.data.message ? err.response.data.message : "Server error"
            setNotify({ message: message, status: 'error' })
            console.log(err)
        }
    }

    const updateUser = async (update) => {

        try {
            const token = localStorage.getItem('token')

            await axios.put("http://" + process.env.REACT_APP_ELECTION_SERVICE_HOST + "/users/" + formValues.user_id, {
                ...update
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            setNotify({ message: 'User information has been updated', status: 'success' })

        } catch (err) {
            if (err.response.status === 403) {
                if (localStorage.getItem('token')) {
                    setPageNotify({ message: 'Session has been expired', status: 'warning' })
                }
                navigate('/auth/login/?redirect=/auth/profile/')
            }
            const message = err.response.data.message ? err.response.data.message : "Server error"
            setNotify({ message: message, status: 'error' })
        }
    }

    const udpatePhoneNumber = async (new_phone_number) => {

        try {

            const token = localStorage.getItem('token')

            await axios.post("http://" + process.env.REACT_APP_ELECTION_SERVICE_HOST + "/users/change-phone-number/request", {
                new_phone_number
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            navigate('/auth/phone-number-verify/?redirect=/auth/profile/&new_phone_number=' + new_phone_number)

        } catch (err) {
            if (err.response.status === 403) {
                if (localStorage.getItem('token')) {
                    setPageNotify({ message: 'Session has been expired', status: 'warning' })
                }
                navigate('/auth/login/?redirect=/auth/profile/')
            }
            const message = err.response.data.message ? err.response.data.message : "Server error"
            setNotify({ message: message, status: 'error' })
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value
        const prev = { ...formValues }

        prev[e.target.name] = value
        setFormValues(prev)

    }

    const handleValueUpdate = (name) => {
        if (name === 'phone_number') {
            udpatePhoneNumber(formValues[name])
            return
        }
        updateUser({ [name]: formValues[name] })
        // send request 
    }

    useEffect(() => {

        if (face_reco_token) {

            const verifyT = async () => {

                try {
                    await axios.get("http://" + process.env.REACT_APP_ELECTION_SERVICE_HOST + "/users/is/auth", {
                        headers: {
                            Authorization: 'Bearer ' + face_reco_token
                        }
                    });

                    // localStorage.setItem("token", face_reco_token)
                    window.location.href = "http://" + process.env.REACT_APP_HOST + "/auth/profile/"
                } catch (err) {
                    setNotify({ message: "User face ID verification error", status: "error" })
                    console.error(err);
                }
            };

            verifyT();

        }

        fetchUser()
    }, [])

    if (!formValues) {
        return
    }

    return (

        <div style={{ backgroundColor: '#EEF7FF' }}>
            <Container >
                <br></br>
                <br></br>
                <Grid container justifyContent={'center'}>
                    <Card style={{ borderRadius: 10, border: '1px solid #E4E4E4', boxShadow: 'none', maxWidth: 900 }}>
                        <CardContent>
                            <Container>
                                <Grid container spacing={5}>

                                    {/* Title */}
                                    <Grid item container>
                                        <p style={{ fontWeight: 'bold', fontSize: 30, color: '#004378' }}>Voter Profile</p>
                                    </Grid>

                                    {/* Form Fields */}
                                    <Grid item container xs={12} md={12} lg={12} spacing={2}>
                                        {[
                                            { label: 'Username', value: formValues.username, name: 'username' },
                                            { label: 'First name', value: formValues.first_name, name: 'first_name' },
                                            { label: 'Last name', value: formValues.last_name, name: 'last_name' },
                                            { label: 'Email', value: formValues.email, name: 'last_name' },
                                            { label: 'Phone number', value: formValues.phone_number, name: 'phone_number' },
                                        ].map((field, index) => (
                                            <React.Fragment key={index}>
                                                <Grid item container xs={12} md={9} lg={9}>
                                                    <TextField
                                                        label={field.label}
                                                        type="text"
                                                        variant="outlined"
                                                        name={field.name}
                                                        value={field.value}
                                                        onChange={handleFormChange}
                                                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item container xs={12} md={2} lg={2}>
                                                    <Button size={'large'} onClick={() => {

                                                        handleValueUpdate(field.name)

                                                    }} fullWidth style={{ backgroundColor: '#004378', color: 'white', textTransform: 'none' }}>
                                                        Update
                                                    </Button>
                                                </Grid>
                                            </React.Fragment>
                                        ))}
                                        <NotificationMessage
                                            status={notify.status}
                                            message={notify.message}
                                            setNotify={setNotify}
                                        />
                                    </Grid>
                                </Grid>
                            </Container>
                        </CardContent>
                        <br></br>
                        <br></br>
                        <CardActions style={{ justifyContent: 'flex-end' }}>
                            <p style={{
                                display: 'inline-block',
                                padding: '10px',
                                borderRadius: '5px',
                                color: 'white',
                                backgroundColor: faceVerified ? 'green' : '#901A1A',
                            }}>
                                {faceVerified ? "Face ID verified" : "Face ID not verified"}
                            </p>
                            <Button size="large" onClick={() => navigate('/auth/password-update/')} style={{ backgroundColor: '#1B639E', color: 'white', textTransform: 'none', marginLeft: 'auto' }}>
                                Change Password
                            </Button>
                            <Button size="large" style={{ backgroundColor: '#901A1A', color: 'white', textTransform: 'none' }}>
                                Delete Account
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Container>
        </div >
    )
}
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';


export default function PasswordReset(){

    return(
        <div style={{ backgroundColor: '#004378' }} >
            <Container style={{ paddingTop: 100, height: '85vh' }}>

                <Grid container justifyContent={'center'}>
                    <Grid item xs={12} sm={5} md={5}>

                        <form>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <p style={{ fontSize: 25, color: 'white' }}>Password reset</p>
                                    <hr style={{ color: '#7B7B7B', borderWidth: 0.4 }}></hr>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="New password"
                                        variant="outlined"
                                        type={'password'}
                                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Confirm password"
                                        variant="outlined"
                                        type={'password'}
                                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} mt={2}>
                                    <Button size={'large'} style={{ backgroundColor: '#1B639E', width: 150, color: 'white', textTransform: 'none'}}>Confirm</Button>
                                </Grid>
                            </Grid>

                        </form>
                    </Grid>
                </Grid>

            </Container>

        </div>
    )
}
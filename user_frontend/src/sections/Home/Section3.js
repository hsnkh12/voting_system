import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import dvs_image3 from '../../assets/dvs_image3.png'
import CheckBoxIcon from '@mui/icons-material/CheckBox';


export default function Section3(){

    return (
        <div >

                <Container style={{ paddingTop: 90, height: '60vh' }}>

                    <Grid container >

                        <Grid item container xs={12} md={7} lg={7} style={{ textAlign: 'start' }} alignItems={'center'}>

                            <Grid item style={{ fontSize: 20 }}>

                                <Grid container alignItems={'center'} gap={1}>

                                    <Grid item>
                                        <CheckBoxIcon style={{ color: '#004378' }} />
                                    </Grid>
                                    <Grid item>
                                        <p> Cast your vote from the comfort of your home</p>
                                    </Grid>
                                </Grid>

                                <Grid container alignItems={'center'} gap={1}>
                                    <Grid item>
                                        <CheckBoxIcon style={{ color: '#004378' }} />
                                    </Grid>
                                    <Grid item>
                                        <p> Trust in our state-of-the-art security measures</p>
                                    </Grid>
                                </Grid>

                                <Grid container alignItems={'center'} gap={1}>
                                    <Grid item>
                                        <CheckBoxIcon style={{ color: '#004378' }} />
                                    </Grid>
                                    <Grid item>
                                        <p> Accessible and inclusive for all voters</p>
                                    </Grid>
                                </Grid>

                                <Grid container alignItems={'center'} gap={1}>
                                    <Grid item>
                                        <CheckBoxIcon style={{ color: '#004378' }} />
                                    </Grid>
                                    <Grid item>
                                        <p> Keep on track of elections</p>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={5} lg={5}>
                            <img src={dvs_image3} alt='img' style={{ width: '100%' }}></img>
                        </Grid>

                    </Grid>


                </Container>

            </div>
    )
    
}
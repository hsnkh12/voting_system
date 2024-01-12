import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import dvs_image2 from '../../assets/dvs_image2.png'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
export default function Section2(){

    const navigate = useNavigate()


    return (
        <div style={{ backgroundColor: '#EEF7FF' }}>

                <Container style={{ paddingTop: 80, height: '70vh' }}>

                    <Grid container >

                        <Grid item container xs={12} md={5} lg={5} >
                            <img src={dvs_image2} alt='img' style={{ width: '100%' }}></img>
                        </Grid>
                        <Grid item container xs={12} md={7} lg={7} style={{ textAlign: 'start' }} alignItems={'center'}>

                            <Grid item style={{ marginLeft: 40 }}>
                                <p style={{ fontSize: 26 }}>Say goodbye to paper ballots and hello to secure, convenient, and accessible voting from anywhere. Checkout our recent elections </p>
                                <Button onClick={()=>navigate("/elections/")} size={'large'} style={{ width: 140, backgroundColor: '#004378', color: 'white', textTransform: 'none' }}>Recent elections</Button>
                            </Grid>

                        </Grid>

                    </Grid>

                </Container>

            </div>
    )
}
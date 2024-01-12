import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import dvs_image from '../../assets/dvs_image.png'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
export default function Section1(){

    const navigate = useNavigate()

    return (
        <div style={{ backgroundColor: '#004378' }} >

                <Container style={{ paddingTop: 100, height: '95vh' }}>
                    <Grid container >

                        <Grid item container xs={12} md={4} lg={4} style={{ textAlign: 'start' }} alignItems={'center'}>

                            <Grid item >
                                <p style={{ fontSize: 34, color: 'white', marginBottom: 0 }}>Step into the future of voting with
                                    <span style={{ fontWeight: 'bold' }}> CypVote</span>
                                </p>
                                <p style={{ fontSize: 18, color: '#D9D9D9' }}>Enhance transparency and revolutionize elections with our cutting-edge digital voting platform.</p>
                                <Button onClick={()=>navigate('/auth/register/')} size={'large'} style={{ width: 130, backgroundColor: 'white', color: '#024B86', textTransform: 'none' }}>Join us</Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={8} lg={8}>
                            <img src={dvs_image} alt='img' style={{ width: '100%' }}></img>
                        </Grid>

                    </Grid>
                </Container>

            </div>
    )
}
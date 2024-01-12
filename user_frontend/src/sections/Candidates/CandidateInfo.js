import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'



export default function CandidateInfo(props) {

    const {
        candidate,
        elections
    } = props


    const [hasImage, setHasImage] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = candidate?.image_url;

        img.onload = () => {
            setHasImage(true);
        };

        img.onerror = () => {
            setHasImage(false);
        };
    }, []);

    return (
        <Card style={{borderRadius: 10,border: '1px solid #E4E4E4', boxShadow: 'none'}}>

            <CardContent >

                <Container>
                    <Grid container >

                        <Grid container item xs={12} md={8} lg={8} justifyContent={'start'} style={{ textAlign: 'start' }}>

                            <Grid item container md={12} lg={12}>
                                <p style={{ fontSize: 27, fontWeight: 'bold', color: '#004378', marginBottom: 0 }}>{candidate.candidate_name}</p>
                            </Grid>
                            <Grid item container>

                                <p><span style={{ fontWeight: 'bold' }}>First name</span>: {candidate.first_name}</p>
                            </Grid>
                            <Grid item container>
                                <p><span style={{ fontWeight: 'bold' }}>Last name</span>: {candidate.last_name}</p>
                            </Grid>

                            <Grid item container >
                                <p><span style={{ fontWeight: 'bold' }}>Email</span>: {candidate.email}</p>
                            </Grid>

                            <Grid item container >
                                <p><span style={{ fontWeight: 'bold' }}>Id</span>: {candidate.candidate_id}</p>
                            </Grid>
                            <Grid item container >
                                <p style={{ color: '#004378' }}>{elections} elections involved</p>
                            </Grid>

                        </Grid>


                        <Grid container item xs={12} md={4} lg={4} justifyContent={'center'} alignContent={'center'}>


                        {hasImage ? (
                                <img src={candidate?.image_url} alt="Your Image" style={{ width: '200px', height: '200px'}} />
                            ) : (
                                <div style={{ backgroundColor: 'gray',fontSize: 30, color:'white', borderRadius: '50%', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                   {candidate?.candidate_name[0]}
                                </div>
                            )}


                        </Grid>


                    </Grid>
                </Container>

            </CardContent>

        </Card>
    )
}
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function CandidateBoxListItem(props) {

    const {
        candidate
    } = props

    const navigate = useNavigate()
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
        <Grid item xs={12} md={2.93} lg={2.93}>
            <Card style={{ borderRadius: 10, border: '1px solid #E4E4E4', boxShadow: 'none' }}>

                <CardContent>
                    <Grid container gap={2} mb={1} mt={1}>

                        <Grid item container justifyContent={'center'}>

                            {hasImage ? (
                                <img src={candidate?.image_url} alt="Your Image" style={{ width: '150px', height: '150px'}} />
                            ) : (
                                <div style={{ backgroundColor: 'gray',fontSize: 30, color:'white', borderRadius: '50%', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                   {candidate?.candidate_name[0]}
                                </div>
                            )}
                        </Grid>

                        <Grid item container justifyContent={'center'} >

                            <Grid item container justifyContent={'center'}>
                                <p>{candidate?.candidate_name}</p>
                            </Grid>
                            <Grid item container justifyContent={'center'}>
                                <Button onClick={() => navigate('/candidates/'+candidate?.candidate_id)} size={'large'} style={{ backgroundColor: '#004378', color: 'white', textTransform: 'none' }}>View profile</Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}
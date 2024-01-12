
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function CandidateListItem(props) {

    const [hasImage, setHasImage] = useState(false);

    const {
        formControlElement,
        candidate
    } = props

    const navigate = useNavigate()

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
        <>
            <Grid container m={1}>

                <Grid container item xs={12} md={6} lg={6}>

                    <Grid item container xs={12} md={8} lg={8}>

                        <Grid item container>
                            <p style={{marginRight: 20, fontSize: 20}}>{candidate?.candidate_name}</p>
                            <Button onClick={() => navigate('/candidates/' + candidate?.candidate_id)} style={{ color: '#004378', textTransform: 'none', padding: 0, marginTop: 3}}>View profile</Button>
                        </Grid>
                        

                    </Grid>


                </Grid>

                <Grid container item xs={12} md={6} lg={6} alignItems={'center'} justifyContent="end">
                    {formControlElement}
                </Grid>

            </Grid>
            <hr style={{ color: '#7B7B7B', borderWidth: 0.4, width: '100%' }}></hr>
        </>
    )
}
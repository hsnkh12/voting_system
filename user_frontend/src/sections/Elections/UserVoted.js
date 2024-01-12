import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function UserVoted(props){


    const {
        election_id,
        userVoted
    } = props 


    const navigate = useNavigate()


    return (
        <Card style={{ overflow: 'auto', border: '1px solid #E4E4E4', boxShadow: 'none' }}>
      <CardContent>
        <Container>
          <Grid container justifyContent="center" alignItems="center"  style={{padding: 12}}>
            <Grid item xs={12}>
              {userVoted?
              <CheckCircleOutlineIcon style={{ fontSize: 100, color: 'green' }} />:
              <AccessTimeIcon style={{ fontSize: 100, color: 'red' }} />}
            </Grid>
            <Grid item xs={12}>
              <p style={{fontSize: 20}}>{userVoted? "Vote submitted": "Election ended"}</p>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => navigate("/elections/results/"+election_id)} style={{textTransform: 'none'}}>
                View Results
              </Button>
            </Grid>
          </Grid>
        </Container>
      </CardContent>
    </Card>
    )
}
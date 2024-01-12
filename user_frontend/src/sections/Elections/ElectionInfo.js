import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom";
export default function ElectionInfo(props) {


    const {
        handleOpenModal,
        election,
        selected,
        userVoted
    } = props
    const navigate = useNavigate()
    const start_date = election?.start_date
    const end_date = election?.end_date? election?.end_date: election?.expected_end_date
    const timeDifference = new Date(end_date).getTime() - new Date(start_date).getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    const statusColor = daysLeft > 10? '#1D5B20': daysLeft <=10 && daysLeft > 1? '#BE8F14': '#901A1A'
    const status = election?.status === "S"? daysLeft+ " day left": "Ended"
  
    return (
        <Card style={{ border: '1px solid #E4E4E4', boxShadow: 'none', borderRadius: 10}}>

            <CardContent >

                <Container>
                    <Grid container >

                        <Grid container item xs={12} md={6} lg={6} justifyContent={'start'} style={{ textAlign: 'start' }} gap={2}>

                            <Grid item container md={12} lg={12}>
                                <p style={{ fontSize: 27, fontWeight: 'bold', color: '#004378', marginBottom: 0}}>{election?.title}</p>
                            </Grid>
                            <Grid item container>

                                <span style={{ marginRight: 10 }}>{election?.election_type}</span>
                            </Grid>
                            <Grid item container>
                                <p>{election?.no_of_candidates} candidates</p>
                            </Grid>
                            <Grid item container>
                                <p>{election?.description}</p>
                            </Grid>

                            <Grid item container >
                                <span style={{ marginRight: 10 }}>{start_date}</span>
                                <span style={{ marginRight: 10 }}>-</span>
                                <span >{end_date}</span>
                            </Grid>

                            <Grid item container >
                                <span style={{ fontWeight: 'bold' }}>{election?.no_of_votes_allowed_per_user} candidates allowed per vote</span>
                            </Grid>

                        </Grid>


                        <Grid container item xs={12} md={6} lg={6} >

                            <Grid item container justifyContent="end" alignContent={'flex-start'}>
                                <p style={{ fontSize: 23, color: statusColor}}>{status}</p>
                            </Grid>

                            <Grid item container alignItems={'center'} justifyContent="end" alignContent={'flex-end'}>
                            {!userVoted && election.status !== "E"?
                                <Button size={'large'} disabled={selected === 0? true: false} onClick={handleOpenModal} style={{ backgroundColor: '#004378', color: 'white', textTransform: 'none' }}>Submit vote</Button>:
                                <Button onClick={() => navigate("/elections/results/"+election.election_id)} style={{ backgroundColor: '#004378', color: 'white', textTransform: 'none' }}>View results</Button>
                                }
                            </Grid>

                        </Grid>


                    </Grid>
                </Container>

            </CardContent>

        </Card>
    )
}
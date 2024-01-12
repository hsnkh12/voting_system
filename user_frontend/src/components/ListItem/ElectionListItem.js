
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function ElectionListItem(props) {

    const {election} = props

    const start_date = election.start_date
    const end_date = election.end_date? election.end_date: election.expected_end_date
    const timeDifference = new Date(end_date).getTime() - new Date(start_date).getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    const statusColor = daysLeft > 10? '#1D5B20': daysLeft <=10 && daysLeft > 1? '#BE8F14': '#901A1A'
    const status = election.status === "S"? daysLeft+ " day left": "Ended"

    return (
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={'/elections/'+election.election_id}>
            <Grid container>

                <Grid container item xs={12} md={4} lg={4} >

                    <Grid item container>
                        <span style={{padding: '0px 10px 0px 10px'}}>
                            <p style={{ fontWeight: 'bold', color: '#004378'}}>{election.title}</p>
                        </span>
                        <span style={{padding: '0px 10px 0px 10px'}}>
                            <p style={{ fontSize: 15 }}>{election.election_type}</p>
                        </span>
                        <span style={{padding: '0px 10px 0px 10px'}}>
                            <p style={{ fontSize: 15 }}>{election.no_of_candidates} candidates</p>
                        </span>

                    </Grid>
                    <Grid item container >
                        <span style={{padding: '0px 10px 0px 10px'}} >
                            <p style={{ fontSize: 15 }}>{start_date}</p>
                        </span>
                        
                        <span style={{padding: '0px 10px 0px 10px'}}>
                            <p style={{ fontSize: 15 }}>{end_date}</p>
                        </span>
                    </Grid>


                </Grid>

                <Grid container item xs={12} md={8} lg={8} alignItems={'center'} justifyContent="end">
                    <p style={{ fontSize: 18, color: statusColor}}>{status}</p>
                </Grid>

            </Grid>
        </Link>
    )
}
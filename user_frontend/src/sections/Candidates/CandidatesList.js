import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import CandidateBoxListItem from '../../components/ListItem/CandidateBoxListItem';

export default function CandidatesList(props) {

    const {
        candidates
    } = props

    return (
        <Grid container spacing={2}>
            {candidates.map((cand) => {

                return (
                    <CandidateBoxListItem
                        candidate={cand}
                    />
                )
            })}
        </Grid>
    )
}
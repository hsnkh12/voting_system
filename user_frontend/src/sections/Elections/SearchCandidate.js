import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';


export default function SearchCandidate(props) {


    const {
        queryParams,
        setQueryParams,
        selected
    } = props 


    return (
        <Card style={{borderRadius: 10,border: '1px solid #E4E4E4', boxShadow: 'none',}}>

            <CardContent >
                <Grid container >

                    <Grid item xs={12} md={4} lg={4} justifyContent={'start'}>
                        <TextField
                            label="Search candidate"
                            type="text"
                            variant="outlined"
                            style={{ backgroundColor: 'white', borderRadius: 5 }}
                            fullWidth
                            value = {queryParams.candidate_name}
                            onChange={(e) => {

                                const prev = {...queryParams}
                                if (e.target.value === ""){
                                    delete prev.candidate_name
                                } else {
                                    prev.candidate_name = e.target.value
                                }
                                setQueryParams(prev)
                        }}
                        />

                    </Grid>

                    <Grid item container xs={12} md={8} lg={8} alignItems={'center'} justifyContent={'end'}>

                        <p style={{ fontWeight: 'bold' }}>{selected} selected</p>

                    </Grid>
                </Grid>
            </CardContent>

        </Card>
    )

}
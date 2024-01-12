import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

export default function CandidatesFilter(props){

    const {
        queryParams,
        setQueryParams
    } = props 


    const [formValues, setFormValues] = useState({})

    const handleFormChange = (e) => {
        const value = e.target.value 
        const name = e.target.name
        const prev = {...formValues}

        if(value === ""){
            delete prev[name]
            setFormValues(prev)
            return
        }

        prev[name] = value 

        setFormValues(prev)

    }

    const handleFormSubmit = () => {

        setQueryParams(formValues)
    }

    return (
        <Card style={{borderRadius: 10,border: '1px solid #E4E4E4', boxShadow: 'none'}}>
            <CardContent>
                <Grid container >

                    <Grid item xs={12} md={4} lg={4} m={1}>
                        <TextField
                            label="Search candidates"
                            type="text"
                            variant="outlined"
                            style={{ backgroundColor: 'white', borderRadius: 5 }}
                            fullWidth
                            name= {'candidate_name'}
                            onChange={handleFormChange}
                            value = {formValues.candidate_name}
                        />

                    </Grid>
                    
                    <Grid item xs={12} md={2} lg={2} m={1}>


                    </Grid>
                    <Grid item container xs={12} md={5} lg={5} m={1} justifyContent="end">
                        <Button size={'large'} onClick={handleFormSubmit} style={{ width: 120,  backgroundColor: '#004378', color: 'white', textTransform: 'none' }}>Search</Button>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    )
}
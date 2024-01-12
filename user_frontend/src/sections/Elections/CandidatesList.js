import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CandidateListItem from '../../components/ListItem/CandidateListItem'
import { Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function CandidatesList(props) {

    const navigate = useNavigate()

    const {
        election_id,
        queryParams,
        selectedCandidates,
        setSelectedCandidates,
        no_of_votes_allowed_per_user
    } = props


    const handleCandidateSelect = (candidateId) => {
        setSelectedCandidates((prevSelected) => {
            // Check if the candidate is already selected
            const isAlreadySelected = prevSelected.includes(candidateId);
            if (!isAlreadySelected && prevSelected.length >= no_of_votes_allowed_per_user) {
                alert("You cannot vote for more than "+no_of_votes_allowed_per_user+" candidates for this election!")
                return prevSelected; // Do not modify the selected candidates array
              }

            if (isAlreadySelected) {
                // Candidate is already selected, remove from the array
                return prevSelected.filter((id) => id !== candidateId);
            } else {
                // Candidate is not selected, add to the array
                return [...prevSelected, candidateId];
            }
        });
    };


    const fetchCandidates = async () => {

        try {

            const token = localStorage.getItem('token')

            const res = await axios.get("http://"+process.env.REACT_APP_ELECTION_SERVICE_HOST+"/elections/candidates/" + election_id,
                {
                    params: queryParams, headers: {
                        Authorization: 'Bearer ' + token
                    }
                })

            setCandidates(res.data)

        } catch (err) {
            if (err.response.status === 403) {
                navigate('/auth/login')
            } else if (err.response.status === 404) {
                navigate("/404")
            }
            console.log(err)
        }

    }

    const [candidates, setCandidates] = useState([])

    useEffect(() => {
        console.log(queryParams)
        fetchCandidates()
    }, [queryParams])


    return (
        <Card style={{ height: 700, overflow: 'auto', border: '1px solid #E4E4E4', boxShadow: 'none' }}>

            <CardContent >

                <Container>

                    <RadioGroup
                        aria-label="gender"
                        name="gender"
                    >

                        {candidates.map(cand => {
                            return (
                                <CandidateListItem
                                    candidate={cand}
                                    formControlElement={
                                        <FormControlLabel
                                            key={cand.candidate_id}
                                            value={cand.candidate_id}
                                            control={<Radio size="large" />}
                                            name={cand.candidate_name}
                                            checked={selectedCandidates.includes(cand.candidate_id)}
                                            onClick={() => handleCandidateSelect(cand.candidate_id)}
                                        />
                                    }
                                    onCandidateSelect={handleCandidateSelect}
                                />
                            )

                        })}

                    </RadioGroup>
                </Container>
            </CardContent>

        </Card>
    )
}
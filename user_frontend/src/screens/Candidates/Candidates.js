import CandidatesFilter from "../../sections/Candidates/CandidatesFilter";
import Container from '@mui/material/Container'
import CandidatesList from "../../sections/Candidates/CandidatesList";
import { useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../../contexts/auth";
export default function Candidates(props) {


    const {setPageNotify} = props
    const [candidates, setCandidates] = useState([])
    const [queryParams, setQueryParams] = useState({

    })
   
    const navigate = useNavigate()

    const fetchCandidates = async () => {

        try{

            const token = localStorage.getItem('token')

            const res = await axios.get("http://"+process.env.REACT_APP_ELECTION_SERVICE_HOST+"/candidates",{
                params: queryParams,
                headers: {
                    Authorization: 'Bearer '+token
                }
            })

            setCandidates(res.data)

        } catch(err){
            if(!err.response){
                navigate("/")
                setPageNotify({message: 'Server error', status:'error'})
                return
            }
            if(err.response.status === 403){
                if(localStorage.getItem('token')){
                    setPageNotify({message: 'Session has been expired', status:'warning'})
                    }
                navigate('/auth/login/?redirect=/candidates/')
            }
            console.log(err)
        }
    }

    useEffect(() => {
  
        fetchCandidates()
    },[queryParams])

    return (
        <div style={{ backgroundColor: '#EEF7FF' }}>

            <Container >
                <br></br>
                <br></br>

                <CandidatesFilter 
                queryParams = {queryParams}
                setQueryParams = {setQueryParams}
                />
                <br></br>

                <CandidatesList 
                candidates = {candidates}
                />

            </Container>
        </div>
    )
}
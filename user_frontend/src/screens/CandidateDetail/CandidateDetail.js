import CandidateInfo from "../../sections/Candidates/CandidateInfo";
import Container from '@mui/material/Container'
import ElectionsList from '../../sections/Elections/ElectionsList'
import { useParams } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../../contexts/auth";
export default function CandidateDetail(props) {


    const {setPageNotify} = props
    const { candidate_id } = useParams()
    const navigate = useNavigate()


    const [candidate, setCandidate] = useState(null)
    const [elections, setElections] = useState([])

    const fetchCandidate = async () => {

        try {

            const token = localStorage.getItem('token')

            const res = await axios.get("http://"+process.env.REACT_APP_ELECTION_SERVICE_HOST+"/candidates/" + candidate_id, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            setCandidate(res.data)
        } catch (err) {
            if(!err.response){
                console.log(err)
                setPageNotify({message: "Server error",status:"error"})
                navigate("/")
                return
            }
            if (err.response.status === 403) {
                if(localStorage.getItem('token')){
                    setPageNotify({message: 'Session has been expired', status:'warning'})
                    }
                navigate("/auth/login/?redirect=/candidates/" + candidate_id)
             } else if (err.response.status === 404) {
                navigate("/404")
            }
        }
    }

    const fetchElections = async () => {
        try {

            const token = localStorage.getItem('token')

            const res = await axios.get("http://"+process.env.REACT_APP_ELECTION_SERVICE_HOST+"/elections/candidate-involved/" + candidate_id, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            
            setElections(res.data)
        } catch (err) {
            if (err.response.status === 403) {
                navigate("/auth/login/?redirect=/candidates/" + candidate_id)
            }
        } 
    }

    useEffect(() => {

        fetchCandidate()
        fetchElections()
    }, [])

    return (
        <div style={{ backgroundColor: '#EEF7FF' }}>

            {candidate?
                <Container>
                    <br></br>
                    <br></br>
                    <CandidateInfo candidate = {candidate} elections = {elections.length}/>

                    <br></br>

                    <ElectionsList elections = {elections}/>


                </Container> : null}

        </div>
    )
}
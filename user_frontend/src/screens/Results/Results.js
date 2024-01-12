import Container from '@mui/material/Container'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import ResultsInfo from '../../sections/Results/ResultsInfo';
import {useParams} from 'react-router-dom'
import ResultsCharts from '../../sections/Results/Charts';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import SubmitComplainModal from '../../components/Modal/SubmitComplainModal';
export default function Results(props){

    const { election_id } = useParams();
    const navigate = useNavigate()
    const [results, setResults] = useState(null)
    const {
        setPageNotify
    } = props


    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };



    const fetchResults = async () => {

        try{

            const token = localStorage.getItem('token')

            await axios.get("http://"+process.env.REACT_APP_ELECTION_SERVICE_HOST+"/elections/"+election_id, {
                headers:{
                    Authorization: 'Bearer '+token
                }
            })

            const res = await axios.get("http://"+process.env.REACT_APP_VOTE_SERVICE_HOST+"/results/election/"+election_id, {
                headers:{
                    Authorization: 'Bearer '+token
                }
            })

            setResults(res.data)

        } catch (err) {
            if(!err.response){
                console.log(err)
                setPageNotify({message: "Server error",status:"error"})
                navigate("/")
                return
            }
            if (err.response.status === 403) {
                setPageNotify({message: 'Session has been expired', status:'warning'})
                navigate('/auth/login/?redirect=/elections/results/' + election_id + "/")
            } else if (err.response.status === 404) {
                navigate("/404")
            }
            console.log(err)
        }
    }


    useEffect(()=>{
        fetchResults()
    },[])

    return (
        <div style={{ backgroundColor: '#EEF7FF' }}>

            <Container >
                <SubmitComplainModal 
                    handleCloseModal = {handleCloseModal}
                    election_id = {election_id}
                    openModal = {openModal}
                    setPageNotify = {setPageNotify} 
                />

                <br></br>
                <br></br>

                <ResultsInfo 
                election_id = {election_id}
                results = {results}
                handleOpenModal = {handleOpenModal}
                />                
            

                <br></br>

                <ResultsCharts results={results}/>               

                <br></br>




            </Container>
        </div>
    )
}
import Container from '@mui/material/Container'
import Pagination from '../../components/Pagination/Pagination';
import ElectionFilter from '../../sections/Elections/ElectionFilter';
import ElectionsList from '../../sections/Elections/ElectionsList';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider } from '../../contexts/auth';

export default function Elections(props) {

    const {setPageNotify} = props
    const navigate = useNavigate()
    const [elections, setElections] = useState([]) 


    const [queryParams, setQueryParams] = useState({
        filter: {
            status: 'S'
        },
        pagination: {
            page: 1
        }
    })


    const fetchElections = async () => {

        try{

            const token = localStorage.getItem('token')
            const response = await axios.get("http://"+process.env.REACT_APP_ELECTION_SERVICE_HOST+"/elections", {
                params: {...queryParams.filter, ...queryParams.pagination},
                headers: {
                    Authorization: 'Bearer '+token
                }
            })
            setElections(response.data)

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
                navigate('/auth/login/?redirect=/elections/')
            }
            console.log(err)
        }

    }


    const setQueryFilter = (filter) => {
        const prevQ = {...queryParams}
        prevQ.filter = filter 
        setQueryParams(prevQ)
    }

    const setQueryPagination = (pagination) => {
        const prevQ = {...queryParams}
        prevQ.pagination = pagination
        setQueryParams(prevQ)
    }

    useEffect(() => {
        fetchElections()
    }, [queryParams])

    return (
        <div style={{ backgroundColor: '#EEF7FF' }}>

            <Container >

                <br></br>
                <br></br>

                <ElectionFilter 
                filter = {queryParams.filter}
                setQueryFilter = {setQueryFilter}
                /> 

                <br></br>

                <ElectionsList 
                elections = {elections}
                /> 

                <br></br>

                <Pagination 
                    pagination = {queryParams.pagination}
                    setQueryPagination = {setQueryPagination} 
                /> 


            </Container>
        </div>
    )
}
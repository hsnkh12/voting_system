import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import Pagination from '../../components/Pagination/Pagination'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import ElectionInfo from '../../sections/Elections/ElectionInfo'
import SearchCandidate from '../../sections/Elections/SearchCandidate'
import CandidateListItem from '../../components/ListItem/CandidateListItem'
import { Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react'
import SubmitVoteModal from '../../components/Modal/SubmitVoteModal'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import CandidatesList from '../../sections/Elections/CandidatesList'
import UserVoted from '../../sections/Elections/UserVoted'
import { AuthContext } from '../../contexts/auth'


export default function ElectionDetail(props) {


    const {setPageNotify} = props
    const [openModal, setOpenModal] = useState(false);
    const [userVoted, setUserVoted] = useState(false)
    const navigate = useNavigate()
    const [election, setElection] = useState(null)
    const { election_id } = useParams();
 
    const [selectedCandidates, setSelectedCandidates] = useState([
    ])

    const checkUserVote = async () => {

        try {

            const token = localStorage.getItem('token')
            const response = await axios.get("http://"+process.env.REACT_APP_VOTE_SERVICE_HOST+"/votes/check-user-vote/" + election_id, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            setUserVoted(response.data)


        } catch (err) {
            if(!err.response){
                console.log(err)
                setPageNotify({message: "Server error",status:"error"})
                navigate("/")
                return
            }
            if (err.response.status === 403) {
                setPageNotify({message: 'Session has been expired', status:'warning'})
                navigate('/auth/login/?redirect=/elections/' + election_id + "/")
            } else if (err.response.status === 404) {
                navigate("/404")
            }
            console.log(err)
        }
    }

    const fetchElection = async () => {

        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("http://"+process.env.REACT_APP_ELECTION_SERVICE_HOST+"/elections/" + election_id, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (response.data.status === 'P'){
                navigate('/404')
                return
            } 
            setElection(response.data)

        } catch (err) {
            if (err.response.status === 403) {
                if(localStorage.getItem('token')){
                    setPageNotify({message: 'Session has been expired', status:'warning'})
                    }
                navigate('/auth/login/?redirect=/elections/' + election_id + "/")
            } else if (err.response.status === 404) {
                navigate("/404")
            }
            console.log(err)
        }
    }

    const [queryParams, setQueryParams] = useState({
    })

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        checkUserVote()
        fetchElection()
    }, [])

    return (
        <div style={{ backgroundColor: '#EEF7FF' }}>

            <Container >

                <SubmitVoteModal
                    openModal={openModal}
                    handleCloseModal={handleCloseModal}
                    selectedCandidates={selectedCandidates}
                    election_id={election_id}
                    setUserVoted ={setUserVoted}
                    setPageNotify = {setPageNotify}
                />

                <br></br>
                <br></br>

                {election?
                    <><ElectionInfo
                        handleOpenModal={handleOpenModal}
                        election={election}
                        selected={selectedCandidates.length}
                        userVoted = {userVoted}
                    />

                        <br></br>
                        {!userVoted && election.status !== 'E'?
                            <>
                                <SearchCandidate

                                    queryParams={queryParams}
                                    setQueryParams={setQueryParams}
                                    selected={selectedCandidates.length}
                                />

                                <br></br>


                                <CandidatesList
                                    election_id={election_id}
                                    queryParams={queryParams}
                                    selectedCandidates={selectedCandidates}
                                    setSelectedCandidates={setSelectedCandidates}
                                    no_of_votes_allowed_per_user={election.no_of_votes_allowed_per_user}
                                /></>
                            : <UserVoted 
                                election_id = {election_id} 
                                userVoted = {userVoted}
                                />}


                    </> : null}


            </Container>
        </div>
    )
}
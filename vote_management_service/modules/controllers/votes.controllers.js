const axios = require('axios');
const dotenv = require("dotenv")
const Vote = require("../storage/models/votes.model")
const VoteToCandidate = require("../storage/models/votes_to_candidates.model")
const VotesFilterQuery = require("../validators/votes.val")
dotenv.config()
const db = require("../storage/db.config")
const {publishMessageToQueue} = require("../rabbitmq/services/vote_background_service")

const submiteVote = async (req, res) => {

    try{
        const {election_id, candidates} = req.body 


        if (!election_id || !candidates){
            return res.status(400).json({
                message: "election_id and candidates required in body"
            })
        }

        const headers = {
            Authorization: req.headers['authorization'],
            'Content-Type': 'application/json'
          };

        const url = "http://"+process.env.ELECTION_MANAGEMENT_SERVICE_HOST+":"+process.env.ELECTION_MANAGEMENT_SERVICE_PORT+"/elections/init-vote-request"
        const response = await axios.post(url, { election_id, candidates}, {headers});

        await publishMessageToQueue(response.data, "submit-vote")

        // We may also publish generating result here for each time a vote is added

        return res.send(true)

    } catch(err){

        if (err.name == "AxiosError"){
            return res.status(400).json({
                message: "Invalid submission"
            })
        }

        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


const getAllVotes = async (req, res) => {

    try{

        const election_id = req.params.election_id

        const query = new VotesFilterQuery(req.query)
        const page = Number.isInteger(query.definePage())? query.definePage() : 1
        const offset = (page - 1) * 50;

        const votes = await Vote.findAll({
            offset,
            limit: 50,
            order: [query.defineSort()],
            where: {
                election_id
            },
            attributes: ["vote_id","user_id","election_id","no_of_votes","date_added"],
            include: query.defineInclude()
        })

        return res.json(votes)


    } catch(err){
        console.log(err)

        return res.status(500).json({
            message: "Internal server error"
        }) 
    }
}



const getOneVote = async (req, res) => {

    try{

        const vote_id= req.params.vote_id

        const vote = await Vote.findOne({
            where: {vote_id},
            include: [{
                model: VoteToCandidate,
            }]
        })

        if (!vote){
            return res.status(404).json({
                message: "Vote not found"
            })
        }

        return res.json(vote)

    } catch(err){
        console.log(err)

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


const deleteAllVotes = async (req, res) => {

    const transaction = await db.transaction()

    try{

        const election_id = req.params.election_id 

        const votes = await Vote.findAll({
            where: {election_id},
            attributes: ["vote_id"]
        }, {transaction})

        for (const vote of votes) {
            await Vote.destroy({
                where: { vote_id: vote.vote_id },
                transaction,
            });
        }

        return res.send(true)


    } catch(err){

        await transaction.rollback()

        if(err.name === 'SequelizeInstanceError'){
            return res.status(404).json({
                message: "Vote not found"
            })
        }
        console.log(err)
        return res.status(500).json({ 
            message: "Internal server error" 
        });
    
    }
}



module.exports = {
    submiteVote,
    getAllVotes,
    getOneVote,
    deleteAllVotes
}
const Election = require("../storage/models/elections.model")
const uuid = require('uuid');
const {ElectionFilterQuery} = require("../core/validators/election.val")
const ElectionToCandidate = require("../storage/models/election_to_candidate.model")
const db = require("../storage/sequelize")
const Candidate = require("../storage/models/candidates.model.js")


const createElection = async (req, res) => {

    try{

        const election_id = uuid.v1()
        const status = "P"
        const {title, election_type, description, no_of_votes_allowed_per_user} = req.body
        const election = await Election.create({title, election_type, description, election_id,status, no_of_votes_allowed_per_user}) 
        return res.json(election)

    } catch(err) {

        if (err.name == "SequelizeUniqueConstraintError"){
            return res.status(409).json({
                message:'Election with this title already exists'
            });
        }

        if (err.name == "SequelizeValidationError"){
            return res.status(400).json({
                message: err.message
            });
        }

        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


const startElection = async (req, res) => {

    try{
        const election_id = req.params.election_id
        const {expected_end_date} = req.body

        if (!expected_end_date){
            return res.status(400).json({
                message: "Expected end date required"
            })
        }

        const election = await Election.findOne({ 
            where: {election_id: election_id},
            attributes: ["election_id","status","start_date","expected_end_date"]
        })

        if(! election){
            return res.status(404).json({
                message: "Election not found"
            })
        }

        election.expected_end_date = new Date(expected_end_date)
        election.status = "S"
        election.start_date = new Date()

        await election.save()

        return res.json(election)

    } catch(err) {

        if (err.name == "SequelizeValidationError"){
            return res.status(400).json({
                message: err.message
            });
        }

        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


const endElection = async (req, res) => {

    try{

        const election_id = req.params.election_id
        const election = await Election.findOne({ 
            where: {election_id: election_id, status: "S"},
            attributes: ["election_id","status","end_date",]
        })

        if(! election){
            return res.status(404).json({
                message: "Election not found"
            })
        }

        election.status = "E"
        election.end_date = new Date()

        await election.save()

        return res.json(election)

    } catch(err) {

        if (err.name == "SequelizeValidationError"){
            return res.status(400).json({
                message: err.message
            });
        }

        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


const getAllElections = async (req, res) => {

    try{

        const electionQuery = new ElectionFilterQuery(req.query)
        const page = Number.isInteger(electionQuery.definePage())? electionQuery.definePage() : 1
        const offset = (page - 1) * 50;


        const elections = await Election.findAll({
            offset,
            limit: 50,
            where: electionQuery.defineClause(),
            order: [electionQuery.defineSort()],
            attributes: ["election_id","election_type","title","start_date","end_date","expected_end_date","status","no_of_candidates"]
        })

        return res.json(elections)

    } catch(err) {

        console.log(err)

        return res.status(500).json({ 
            message: "Internal server error" 
        });
    
    }
}

const getOneElectionById = async (req, res) => {

    try{
        const election_id = req.params.election_id

        const election = await Election.findOne({
            where: {election_id: election_id}
        })

        if(!election){
            return res.status(404).json(
                {message: "Election not found"}
            )
        }

        return res.json(election)

    } catch(err) {

        console.log(err)

        return res.status(500).json({ 
            message: "Internal server error" 
        });
    }
}

const getOneElectionByTitle = async (req, res) => {

    try{
        const title = req.params.title

        const election = await Election.findOne({
            where: {title: title}
        })

        if(!election){
            return res.status(404).json(
                {message: "Election not found"}
            )
        }

        return res.json(election)

    } catch(err) {

        console.log(err)

        return res.status(500).json({ 
            message: "Internal server error" 
        });
    }
}

const updateElection = async (req, res) => {

    try{

        const election_id = req.params.election_id; 
        const updateFields = req.body; 

        const election = await Election.findOne({
            where: {election_id: election_id}
        })

        if(!election){
            return res.status(404).json({
                message: "Election not found"
            })
        }

        for (const field in updateFields) {
            if (updateFields.hasOwnProperty(field) && field != "election_id" && field != "no_of_candidates") {
                election[field] = updateFields[field];
            }
        }

        await election.save()
        return res.json(election)

    } catch(err) {
        

        if (err.name == "SequelizeUniqueConstraintError"){
            return res.status(409).json({
                message:'Election with this title already exists'
            });
        }
        
        if (err.name == "SequelizeValidationError"){
            return res.status(400).json({
                message: err.message
            });
        }

        console.log(err)
        return res.status(500).json({ 
            message: "Internal server error" 
        });
    
    }
}


const deleteElection = async (req, res) => {

    try{

        const election_id = req.params.election_id 

        await Election.destroy({
            where: { election_id: election_id}
        })

        res.send(true)

    } catch(err) {


        if(err.name === 'SequelizeInstanceError'){
            return res.status(404).json({
                message: "Election not found"
            })
        }

        console.log(err)
        return res.status(500).json({ 
            message: "Internal server error" 
        });
    }
}

const addCandidateToElection = async (req, res) => {

    let transaction 

    try{

        transaction = await db.transaction()
        const election_id = req.params.election_id 
        const candidate_id = req.body.candidate_id 
        

        if (!candidate_id){
            await transaction.rollback();
            return res.status(400).json({
                message: "candidate_id field required"
            })
        }

        const election = await Election.findOne({ 
            where: {election_id},
            attributes: ["election_id", "no_of_candidates"]
        }, {transaction})

        if (!election){
            await transaction.rollback();
            return res.status(404).json({
                message: "Election not found"
            })
        }

        const candidate = await Candidate.findOne({
            where: { candidate_id},
            attributes: ["candidate_id","candidate_name"]
        }, {transaction})

        if (!candidate){
            return res.status(404).json({
                message: "Candidate not found"
            })
        }
        
        const [record, created] = await ElectionToCandidate.findOrCreate({
            where: {election_id, candidate_id},
            defaults : {election_id, candidate_id, candidate_name: candidate.candidate_name}
        })

        if (created == true ){
            election.no_of_candidates = election.no_of_candidates + 1
            await election.save({transaction})
        }

        await transaction.commit()

        res.json(record)

    } catch(err){
        
        console.log(err)

        if (transaction){
            await transaction.rollback();
        }
        return res.status(500).json({ 
            message: "Internal server error" 
        });

    }
}

const removeCandidateFromElection = async (req, res) => {

    let transaction 

    try{
        transaction = await db.transaction()
        const election_id = req.params.election_id 
        const candidate_id = req.body.candidate_id 


        const election = await Election.findOne({ 
            where: {election_id},
            attributes: ["election_id", "no_of_candidates"]
        },{transaction})

        if (!election){
            await transaction.rollback();
            return res.status(404).json({
                message: "Election not found"
            })
        }

        const result = await ElectionToCandidate.destroy({
            where: {election_id, candidate_id}
        },{transaction})


        if (result== true){
            election.no_of_candidates = election.no_of_candidates - 1
            await election.save({transaction})
        }

        await transaction.commit()

        return res.send(true)


    } catch(err) {

        if (transaction){
            await transaction.rollback();
        }
        if(err.name === 'SequelizeInstanceError'){
            return res.status(404).json({
                message: "Election not found"
            })
        }

        console.log(err)
        return res.status(500).json({ 
            message: "Internal server error" 
        });

    }
}

const getAllCandidatesInElection = async (req, res) => {

    try{

        const election_id = req.params.election_id

        const candidates = await ElectionToCandidate.findAll({
            where: {election_id},
            attributes: ["id","election_id"],
            include: 
            [
                {
                    model: Candidate,
                    attributes: ['candidate_id','candidate_name','first_name','last_name']
                }
            ]
            
        })

        res.json(candidates)

    } catch(err){
        console.log(err)
        return res.status(500).json({ 
            message: "Internal server error" 
        });
    }
}


const initiateVoteRequest = async (req, res) => {

    try{
        const { election_id, candidates} = req.body 
        const resp = []

        const election = await Election.findOne({
            where:{ election_id, status: "S"},
            attributes: ["election_id","no_of_votes_allowed_per_user"]
        })

        if (!election){
            return res.sendStatus(404)
        }

        if (election.no_of_votes_allowed_per_user < candidates.length){
            return res.sendStatus(400)
        }

        for (const candidate_id of candidates){

            const elec_to_cand = await ElectionToCandidate.findOne({
                where: {id:candidate_id},
                attributes: ["id","candidate_name"]
            })

            if (!elec_to_cand){
                return res.sendStatus(404)
            }

            resp.push([elec_to_cand.id, elec_to_cand.candidate_name])
        }

        return res.status(200).json({user_id: req.user_id, election_id, election_to_candidates: resp})

    } catch(err){
        console.log(err)
        return res.status(500).json({ 
            message: "Internal server error" 
        });
    }
}


module.exports = {
    createElection,
    startElection,
    endElection,
    getAllElections,
    getOneElectionById,
    updateElection,
    deleteElection,
     getOneElectionByTitle,
    addCandidateToElection,
    removeCandidateFromElection,
    getAllCandidatesInElection,
    initiateVoteRequest
}
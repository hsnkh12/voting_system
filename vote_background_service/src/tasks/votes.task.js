const {createNewConnection} = require("../db/db")
const uuid = require("uuid")

const submitVote = async (kwargs) => {


  const connection = await createNewConnection()
  try {
      await connection.beginTransaction(); 

      const vote_id = uuid.v1()

      const elec_to_cands = kwargs.election_to_candidates
      const currentDate = new Date()


      const encryptedUserId = kwargs.user_id


      const rows =await  connection.execute('SELECT election_id, user_id FROM Votes WHERE election_id=? AND user_id=?',[kwargs.election_id, encryptedUserId])


      if (rows[0].length >= 1){
        await connection.commit(); 
        console.log('Transaction committed successfully. Already exists');
        return
      }
  
      await connection.execute('INSERT INTO Votes(vote_id,user_id,election_id,no_of_votes, createdAt,updatedAt) VALUES(?,?,?,?,?,?,?);',
      [vote_id, encryptedUserId, kwargs.election_id, elec_to_cands.length, currentDate, currentDate]);

      for( election_to_candidate of elec_to_cands){
        await connection.execute('INSERT INTO VoteToCandidates(candidate_name,vote_id,election_to_candidate_id,createdAt,updatedAt, election_id) VALUES(?,?,?,?,?,?);',
        [election_to_candidate[1], vote_id, election_to_candidate[0], currentDate, currentDate, kwargs.election_id])
      }
      await connection.commit();
  
      console.log('Transaction committed successfully. Added');
    } catch (error) {
      await connection.rollback(); 
      console.error('Transaction failed:', error);
    } finally {
      connection.end(); 
    }

}



module.exports = {submitVote}
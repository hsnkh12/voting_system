const {createNewConnection} = require("../db/db")


const generateResult = async (kwargs) => {

    const connection = await createNewConnection()

    try{
        await connection.beginTransaction(); 

        const election_id = kwargs.election_id

        const voteCounts = {} 

        const vC = await connection.execute('SELECT vote_id FROM Votes WHERE election_id=? ', [election_id])

        const no_of_voters = vC[0].length

        const candidate_to_votes = await connection.execute('SELECT candidate_name, election_id FROM VoteToCandidates WHERE election_id=?', [election_id])


        for (const row of candidate_to_votes[0]) {
            const candidateName = row.candidate_name;
        
            if (voteCounts[candidateName]) {
              voteCounts[candidateName]++;
            } else {
              voteCounts[candidateName] = 1;
            }
        }

        const sortedCandidates = Object.keys(voteCounts).sort((a, b) => voteCounts[b] - voteCounts[a]);

        const topThreeCandidates = sortedCandidates.slice(0, 3);

        const checkResult = await connection.execute('SELECT * FROM Results WHERE election_id=?',[election_id])

        const first =topThreeCandidates[0]? topThreeCandidates[0]: null 
        const second = topThreeCandidates[1]? topThreeCandidates[1]: null 
        const third = topThreeCandidates[2]? topThreeCandidates[2]: null 

        const firstVotes = voteCounts[first]? voteCounts[first] : null 
        const secondVotes = voteCounts[second]? voteCounts[second]: null 
        const thirdVotes = voteCounts[third]? voteCounts[third]: null


        if (checkResult[0].length > 0){

            await connection.execute('UPDATE Results SET first_candidate_name=?, second_candidate_name=?, third_candidate_name=?, first_votes=?, second_votes=?, third_votes=?, no_of_voters=?, no_of_votes=?, date_generated=?, updatedAt =?',
            [first, second, third, firstVotes, secondVotes, thirdVotes, no_of_voters, candidate_to_votes[0].length, new Date(), new Date()])
        } else {
            await connection.execute('INSERT INTO Results(election_id, first_candidate_name, second_candidate_name, third_candidate_name, first_votes, second_votes, third_votes, no_of_voters, no_of_votes, date_generated, createdAt, updatedAt) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
            [election_id,first, second, third, firstVotes, secondVotes, thirdVotes, no_of_voters, candidate_to_votes[0].length, new Date(), new Date(), new Date()])
        }


        await connection.commit();


        console.log('Transaction committed successfully. Added');
    } catch(err){
        await connection.rollback(); 
        console.error('Transaction failed:', err);

       

    } finally {
        connection.end(); 
    }

}


module.exports = {generateResult}
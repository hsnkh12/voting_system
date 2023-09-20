const Vote = require("./votes.model")
const Result = require("./results.model")
const VoteToCandidate = require("./votes_to_candidates.model")



module.exports = initModels = (db) => {

    Vote.define(db)
    VoteToCandidate.define(db)
    Result.define(db)
}
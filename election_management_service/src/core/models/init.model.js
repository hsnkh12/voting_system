const Candidate= require("./candidates.model")
const Complain = require("./complains.model")
const ElectionToCandidate = require("./election_to_candidate.model")
const Election = require("./elections.model")
const SMSUserCode= require("./sms_code_user.model.js")
const User= require("./users.model")


module.exports = initModels = (db) => {

    User.define(db)
    SMSUserCode.define(db)
    Election.define(db)
    Candidate.define(db)
    ElectionToCandidate.define(db)
    Complain.define(db)

}
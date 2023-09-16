const { DataTypes } = require('sequelize');
const {Candidate} = require("./candidates.model")
const {Election} = require("./elections.model")

class ElectionToCandidate {

static define = (db) => {
  this.model = db.define('ElectionToCandidate', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  candidate_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  candidate_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Candidates', // Reference the Candidate model
      key: 'candidate_id', // Candidate's primary key column
    },
    onDelete: 'CASCADE', // Cascade delete
    onUpdate: 'CASCADE', // Cascade update
  },
  election_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Elections', // Reference the Election model
      key: 'election_id', // Election's primary key column
    },
    onDelete: 'CASCADE', // Cascade delete
    onUpdate: 'CASCADE', // Cascade update
  },
});


}}

module.exports = ElectionToCandidate


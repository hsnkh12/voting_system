const { DataTypes } = require('sequelize');
const Vote = require("../models/votes.model")


class VoteToCandidate{

static define = (db) => {
  this.model = db.define('VoteToCandidate', {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    candidate_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    vote_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: Vote,   
        key: 'vote_id',     
      },
    },
    election_to_candidate_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  
  });
}}


module.exports = VoteToCandidate
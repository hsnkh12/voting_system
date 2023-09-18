const { DataTypes } = require('sequelize');
const db = require("../db.config"); 
const Vote = require("../models/votes.model")

const VoteToCandidate = db.define('VoteToCandidate', {

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

VoteToCandidate.belongsTo(Vote, { foreignKey: 'vote_id', onDelete: 'CASCADE' });
Vote.hasMany(VoteToCandidate, { foreignKey: 'vote_id', onDelete: 'CASCADE' })

module.exports = VoteToCandidate
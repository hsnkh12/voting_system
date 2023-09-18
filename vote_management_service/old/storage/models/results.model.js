const { DataTypes } = require('sequelize');
const db = require("../db.config"); 



const Result = db.define('Result', {
    election_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    first_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    second_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    third_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    first_votes :{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    second_votes :{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    third_votes :{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    no_of_voters: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    no_of_votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    date_generated: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    }
  });


module.exports = Result
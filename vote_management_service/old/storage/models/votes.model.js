const { DataTypes } = require('sequelize');
const db = require("../db.config"); 


const Vote = db.define('Vote', {
    vote_id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    election_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    no_of_votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    date_added: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  
  });



module.exports = Vote
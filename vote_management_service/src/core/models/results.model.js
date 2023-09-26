const { DataTypes } = require('sequelize');


class Result{

static define = (db) => {
  this.model = db.define('Result', {
    election_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    first_candidate_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    second_candidate_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    third_candidate_name: {
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
}
}

module.exports = Result
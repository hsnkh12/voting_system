const { DataTypes } = require('sequelize');

class Election{
static define = (db) => {

this.model = db.define('Election', {
  election_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  election_type: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,
  },
  expected_end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  end_date: {
    type: DataTypes.DATEONLY,
  },
  status: {
    type: DataTypes.ENUM('P', 'S', 'E'),
    allowNull: false,
  },
  no_of_votes_allowed_per_user: {
    type: DataTypes.INTEGER,
    defaultValue: 1 
  },
  no_of_candidates: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
});
}
}

module.exports = Election;

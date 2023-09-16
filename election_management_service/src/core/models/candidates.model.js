const { DataTypes } = require('sequelize');

 
class Candidate{

static define = (db) => {

this.model = db.define('Candidate', {
  candidate_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  candidate_name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(200),
    unique: true,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING(500),
  },
  date_added: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});
}
}

module.exports = Candidate


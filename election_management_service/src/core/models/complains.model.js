const { DataTypes } = require('sequelize');
const {User} = require("./users.model")
const {Election} = require("./elections.model")


class Complain{

static define = (db) => {
  this.model = db.define('Complain', {
  complain_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users', // Reference the Election model
      key: 'user_id', // Election's primary key column
    },
  },
  election_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Elections', // Reference the Election model
      key: 'election_id', // Election's primary key column
    },
    date_added: {
      type: DataTypes.DATE,
      allowNull: false
    }

  },
  message: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
});

}
}



module.exports = Complain
const { DataTypes } = require('sequelize');



class SMSUserCode{


static define = (db) => {  
  this.model = db.define('SMSUserCode', {

    sms_user_code_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Reference the Election model
      key: 'user_id', // Election's primary key column
    },
    onDelete: 'CASCADE', // Cascade delete
    onUpdate: 'CASCADE', // Cascade update
  },
  phone_number : {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  code: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  expire_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
}
}


module.exports = SMSUserCode




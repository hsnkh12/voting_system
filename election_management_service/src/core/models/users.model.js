const { DataTypes } = require('sequelize');

class User{
  static define = (db) =>{
  this.model = db.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    email: {
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
    phone_number: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    renew_phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: false,
    },
    face_id_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    date_joined: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    last_login: {
      type: DataTypes.DATEONLY,
    },
});
}

}
module.exports = User


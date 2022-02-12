const { Sequelize, DataTypes } = require('sequelize')
const db = require('../services/db');

const Profile = db.define('profiles', {
  // Model attributes
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  fb: {
    type: DataTypes.STRING
  },
  ig: {
    type: DataTypes.STRING
  }
}, 
// Configuration
{
  freezeTableName: true,
  timestamps: false
});

// console.log(Profile === sequelize.models.Profile); // true
module.exports = Profile;
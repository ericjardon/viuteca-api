const { Sequelize, DataTypes } = require('sequelize')
const db = require('../services/db')
const Profile = require('./Profile')

const Video = db.define('videos', {
  // Model attributes
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dt: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(500),
  },
  duration_hrs: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duration_mins: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duration_secs: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  img_url: {
    type: DataTypes.TEXT,
  },
  video_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  profile_id: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, 
// Configuration
{
  freezeTableName: true,
  timestamps: false
});

Video.hasOne(Profile, {foreignKey: 'profile_id', targetKey: 'id'});

module.exports = Video;
const { Sequelize, DataTypes } = require('sequelize')
const db = require('../services/db');

const Tag = db.define('tags', {
    profile_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    }},
    {
        freezeTableName: true,
        timestamps: false
    });


module.exports = Tag;
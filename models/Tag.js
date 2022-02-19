const { Sequelize, DataTypes } = require('sequelize')
const db = require('../services/db');
const Profile = require('./Profile');

const Tag = db.define('tags', {
    profile_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }},
    {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        // indexes: [
        //     {
        //         using: 'BTREE',
        //         fields: [
        //           'title'
        //         ]
        //       }
        // ] // try without index first
    });

Tag.belongsTo(Profile, {foreignKey: 'profile_id', targetKey: 'id'});

module.exports = Tag;
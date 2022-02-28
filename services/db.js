require('dotenv').config();
const { Sequelize } = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL, {native: true}) // try without ssl setup

module.exports = conn;
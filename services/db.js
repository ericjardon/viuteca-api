require('dotenv').config();
const { Client } = require('pg');
const { Sequelize } = require('sequelize');

let conn;

async function initialize() {
    console.log("Init sequelize connection");
    conn = new Sequelize(process.env.DATABASE_URL, {native: true}) // try without ssl setup
    try {
        await conn.authenticate();
        console.log('db.js: Connection has been established successfully.');
      } catch (error) {
        console.error('db.js: Unable to connect to the database:', error);
    }
}

// async function initialize_() {
//     console.log("Inside initialize");
//     conn = new Client({
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//             rejectUnauthorized: false
//         }
//     });
//     console.log("before connecting to", process.env.DATABASE_URL);
//     await conn.connect();
//     console.log("after connecting!");
//     try {
//         const res = await conn.query('SELECT table_schema,table_name FROM information_schema.tables;');
//         for (let row of res.rows) {
//             console.log(JSON.stringify(row));
//         }
//     } catch (err) {
//         throw err;
//     }
//     console.log("Connected to database pool correctly");
// }

module.exports.initialize = initialize


async function close() {
    await conn.close();  // client.end()
}

module.exports.close = close;
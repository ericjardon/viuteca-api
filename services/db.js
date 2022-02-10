require('dotenv').config();
const { Client } = require('pg');

let client;


async function initialize() {
    console.log("Inside initialize");
    client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    console.log("before connecting to", process.env.DATABASE_URL);
    await client.connect();
    console.log("after connecting!");
    try {
        const res = await client.query('SELECT table_schema,table_name FROM information_schema.tables;');
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
    } catch (err) {
        throw err;
    }
    console.log("Connected to database pool correctly");
}
// the connection pool should start before the web server
module.exports.initialize = initialize


async function close() {
    await client.end();
}

module.exports.close = close;
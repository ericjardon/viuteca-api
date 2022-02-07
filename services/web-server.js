const express = require('express');
const cors = require('cors');
const webServerConfig = require('../config/web-server');
const database = require('./db'); // normally we wouldn't use this here
const morgan = require('morgan');

let httpServer;

function initialize() {
    return new Promise((resolve, reject) => {

        const app = express();
        app.use(express.json());
        app.use(morgan('combined'));
        // app.use(
        //     cors({
        //         origin: ['https://viuteca.vercel.app', 'http://localhost:3000'],
        //         exposedHeaders: 'auth-token',
        //         credentials: true
        //     })
        // )
        
        app.get('/', async (req, res) => {
            // const result = await database.simpleExecute('select user from users');
            // const user = result.rows[0].USER;
            res.end('Welcome to the Viuteca REST API');
        })
        
        httpServer = app.listen(webServerConfig.port, (err) => {
            if (err) {
                reject(err);
                return;
            }
            console.log("Viuteca Server up and running in " + webServerConfig.port)
            resolve();
        });
    })
}

module.exports.initialize = initialize;


function close() {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        })
    })
}

module.exports.close = close;
const express = require('express');
const cors = require('cors');
const webServerConfig = require('../config/web-server');
const morgan = require('morgan');

const profilesRouter = require('../routes/profiles');

let httpServer;

const CORS_OPTIONS = {
    //origin: ['https://viuteca.vercel.app', 'http://localhost:3000']
}

function initialize() {
    return new Promise((resolve, reject) => {
        const server = express();
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));
        server.use(morgan('combined'));
        server.use(cors(CORS_OPTIONS));
        
        // Routers
        server.use('/profiles', profilesRouter);



        server.get('/', async (req, res) => {
            // const result = await database.simpleExecute('select user from users');
            // const user = result.rows[0].USER;
            res.end('Welcome to the Viuteca REST API');
        })
        console.log("Web server config port", webServerConfig.port)
        httpServer = server.listen(webServerConfig.port, (err) => {
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
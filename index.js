require('dotenv').config();
const webServer = require('./services/web-server');
const database = require('./services/db');
const dbConfig = require('./config/db');
const admin = require('./services/firebase-admin');
const defaultThreadPoolSize = 4;

// Increase thread pool by poolMax so we can allocate our db pool
process.env.UV_THREADPOOL_SIZE = dbConfig.vtPool.poolMax + defaultThreadPoolSize;

async function startServer() {
    console.log('Starting server:');
    // Use try-catch instead of .then().catch()

    try {
        console.log('Initializing database module...');

        await database.initialize();
    } catch (err) {
        console.error(err);
        // Cannot start our app without db access
        process.exit(1);
    }

    try {
        console.log('Initializing web server module...');
        await webServer.initialize();
    } catch (e) {
        console.error(e);

        process.exit(1);
    }
}

startServer();


async function shutdown(e) {
    let err = e;
    console.log('Shutting down...');

    try {
        console.log("Attempting to close web server module");

        await webServer.close();
    } catch (e) {
        console.log('Error on shutdown', e);

        err = err || e;
    }

    // Database should close after the web server but before process exits.
    try {
        console.log('Closing database connection');

        await database.close();
    } catch (err) {
        console.log('Error while closing database connection', e);

        err = err || e;
    }

    console.log('Exiting process');

    if (err) {
        process.exit(1);
    } else {
        process.exit(0);
    }
}

/* Controlled shutdown events */
process.on('SIGTERM', () => {
    console.log('Received SIGTERM');

    shutdown();
})

process.on('SIGINT', () => {
    console.log('Received SIGINT');

    shutdown();
})

process.on('uncaughtException', err => {
    console.log('Uncaught exception');
    console.error(err);

    shutdown(err);
})
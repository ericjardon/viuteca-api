const oracledb = require('oracledb');
const dbConfig = require('../config/db');

async function initialize() {
    // console.dir(dbConfig);
    const pool = await oracledb.createPool(dbConfig.vtPool);
    console.log("Connected to database pool correctly");
}
// the connection pool should start before the web server
module.exports.initialize = initialize


async function close() {
    await oracledb.getPool().close();
}

module.exports.close = close;


function simpleExecute(statement, binds=[], opts={}) {
    return new Promise(async (resolve, reject) => {
        let conn;

        opts.outFormat = oracledb.dbObjectAsPojo;
        opts.autoCommit = true;

        try {
            conn = await oracledb.getConnection();
            const result = await conn.execute(statement, binds, opts);

            resolve(result);
        } catch (err) {
            reject(err);

        } finally {
            // Always executes
            if (conn) {
                // close the connection
                try {
                    await conn.close();
                } catch (err) {
                    console.log('Error on simpleExecute', err);
                }
            }
        }
    })
}

module.exports.simpleExecute = simpleExecute;
module.exports = {
    vtPool: {
        user: process.env.VT_USER,
        password: process.env.VT_PASSWORD,
        connectionString: process.env.VT_CONNECTIONSTRING,
        poolMin:10,
        poolMax:10,
        poolIncrement:0,
    } // min==max and 0 increment is good for consistent usage connection pools.
}
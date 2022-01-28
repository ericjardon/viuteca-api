const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3010;
const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ['https://viuteca.vercel.app', 'http://localhost:3000'],
        exposedHeaders: 'auth-token',
        credentials: true
    })
)

// Routers

const EXAMPLE = process.env.CONNECTIONSTRING;

/* DB SERVER CONNECTION */

app.listen(port, () => {
    console.log("Viuteca Server up and running in " + port)
});
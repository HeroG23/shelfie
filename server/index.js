require('dotenv').config();
const express = require('express');
const massive = require('massive');
// const ctrl = require('./controller.js');
const app = express();
const{SERVER_PORT, CONNECTION_STRING} = process.env;

massive({
    connectionString: CONNECTION_STRING,
    ssl:{rejectUnauthorized:false}
}).then(db => {
    app.set("db", db)
    console.log('Server is connected to the database')
}).catch(err => console.log(err));

app.use(express.json());

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`));
require('dotenv').config()
const pg = require('pg')
const client = new pg.Client(process.env.DB_CONNECTION_STRING)
pg.defaults.ssl = true;
client.connect()

// new change 1

module.exports = client;
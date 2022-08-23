require('dotenv').config()
const { Client } = require('pg')
const client = new Client(process.env.DB_CONNECTION_STRING, {ssl:true})
client.connect()



module.exports = client;
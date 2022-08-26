const app = require('express')();
const client = require('../db-client')


app.get('/api/todos', (req, response) => {
    client.query('SELECT * FROM to_do;', (err, res) => {
    if (err) console.log(err);
    response.setHeader('access-control-allow-origin', '*');
    response.send(res.rows);
  })
});

// TODO: Add a POST route
// TODO: Add a DELETE route
// TODO: ADD a PUT route
// TODO

module.exports = app;

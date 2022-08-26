const app = require('express')();
const client = require('../db-client')


app.get('/api', (req, response) => {
    client.query('SELECT * FROM to_do;', (err, res) => {
    if (err) console.log(err);
    response.setHeader('access-control-allow-origin', '*');
    response.send(res.rows);
  })
  
});

// new comment 2
// new comment
module.exports = app;

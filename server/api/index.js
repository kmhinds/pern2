const app = require('express')();
const client = require('../db-client')

// function checkUser(req, res, next) {
//   if ( req.path == '/') return next();

//   //authenticate user
//   next();
//  }

function addHeader(req, res, next) {
  if (req.path == '/') {
    return next();
  }
  next();
}
// app.use([(req, res) => {
//   response.setHeader('access-control-allow-origin', '*');
// }])

app.get('/api/todos', (req, response) => {
    client.query('SELECT * FROM to_do;', (err, res) => {
    if (err) console.log(err);
    response.send(res.rows);
  })
});

// TODO: Add a POST route
// TODO: Add a DELETE route
// TODO: Add a PUT route
// TODO: Add route /api/todo?

module.exports = app;

const app = require('express')();
const client = require('../db-client')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const allowOrigin = (_, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('access-control-allow-origin', '*');
  next();
};



app.use(allowOrigin, jsonParser)

app.get('/api/todos', (req, response) => {
    client.query('SELECT * FROM to_do;', (err, dbRes) => {  
    if (err) console.log(err);
    response.json(dbRes.rows);
  })
});

app.post('/api/todos', (req, response) => {
  const body = req.body;

  console.log(body);
  client.query(`
    INSERT INTO to_do (id, description, priority) 
    VALUES (DEFAULT, '${body.description}', '${body.priority}');`
    ), 
    (err, dbRes) => {
      if (err) {
        console.log(err);
        response.status(500).json({error: 'failed to add todo'})
      } 
      response.json(dbRes.rows)
    }
});

app.put('/api/todos/:id', (req, response) => {
  console.log('PARAMS: ', req.params)
  console.log('BODY: ', req.body)

  // client.query(
  //   `UPDATE to_do
  //   SET '${body.description}', '${body.priority}'
  //   WHERE ${body.description}
  //   AND ${body.priority}`),
  // (err, dbRes) => {
  //   if (err) {
  //     console.log(err);
  //     response.status(500).json({error: 'failed to update todo'})
  //   }
  //   response.json(dbRes.rows) 
  // }
})


// TODO: Add a POST route = done
// TODO: Add a DELETE route
// TODO: Add a PUT route
// TODO: Add route /api/todo?

module.exports = app;

const app = require('express')();
const client = require('../db-client')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const allowOrigin = (_, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  next();
};

app.use(allowOrigin, jsonParser)

app.get('/api/todos', (req, response) => {
    client.query('SELECT * FROM to_do ORDER BY id;', (err, dbRes) => {  
    if (err) console.error(err);
    response.json(dbRes.rows);
  })
});

app.post('/api/todos', (req, response) => {
  const body = req.body;

  client.query(`
    INSERT INTO to_do (id, description, priority) 
    VALUES (DEFAULT, '${body.description}', '${body.priority}');`
    ), 
    (err, dbRes) => {
      if (err) {
        console.error(err);
        response.status(500).json({error: 'failed to add todo'})
      } 
      response.json(dbRes.rows)
    }
});

app.put('/api/todos/:id', (req, response) => {
  console.log('PARAMS: ', req.params)
  console.log('BODY: ', req.body)
  const body = req.body;

  client.query(
    `UPDATE to_do
    SET description = '${body.description}', priority = '${body.priority}'
    WHERE id = '${req.params.id}'`),
  (err, dbRes) => {
    if (err) {
      console.error(err);
      response.status(500).json({error: 'failed to update todo'})
    }
    response.json(dbRes.rows) 
  }
})


// TODO: Add a GET route = done
// TODO: Add a POST route = done
// TODO: Add a PUT route = done
// TODO: Add a DELETE route =
// TODO: Add route /api/todo?

module.exports = app;

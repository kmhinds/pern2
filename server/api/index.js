const app = require('express')();

app.get('/api', (req, res) => {
  res.send('hello-world');
});

module.exports = app;

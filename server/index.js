const express = require('express')

const api = express();

api.get('/hello-world', (req, res) => {
    res.json('hello-world')
});

api.listen(process.env.PORT || 3000, () => {
    console.log('listening on port:3000')
})

// new comment

const app = require("./index.js");
require('dotenv').config();

app.listen(process.env.SERVER_PORT, () => {
    console.log('listening')
})


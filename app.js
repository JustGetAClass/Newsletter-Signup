const express = require("express");
const https = require("https");

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`listening at port ${port}`)
})

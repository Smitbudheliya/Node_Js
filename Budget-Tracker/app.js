const express = require("express");
const port = 8000;
const path = require("path")
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded())

app.use('/',require('./routes/index'))
const db = require("./config/db");

app.use(express.static(path.join(__dirname,'assets')))

app.listen(port,(err) => {
    if (err) {
        console.log("error in running the server", err);
    }
    console.log("server is running on port", port);
});
const express = require('express');
const path = require('path');
const port = 8000;
const app = express();


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'assets'))) // css add
app.use(express.urlencoded());

app.use('/',require('./routes/index'));

app.listen(port,(err) => {
    err? console.log(err) : console.log(`Server is running on port ${port}`);
})
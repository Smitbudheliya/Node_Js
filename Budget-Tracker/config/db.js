const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/budget-tracker");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", (err)=>  {
    if(err) return console.log(err);
    console.log("Connected successfully");
});
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/crud")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

// Task Schema
const taskSchema = new mongoose.Schema({
    title: String
});
const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', { tasks });
});

app.post('/add', async (req, res) => {
    const newTask = new Task({
        title: req.body.title
    });
    await newTask.save();
    res.redirect('/');
});

// Server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

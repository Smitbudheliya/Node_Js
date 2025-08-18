const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Todo = require('./models/todoModel');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Home page - show all todos
app.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.render('todo', { todos });
});

// Create todo
app.post('/todo', async (req, res) => {
    try {
        await Todo.create(req.body);
        res.redirect('/');
    } catch (err) {
        res.send("Error: " + err.message);
    }
});

// Edit form
app.get('/todo/:id/edit', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.render('edit', { todo });
});

// Update todo
app.put('/todo/:id', async (req, res) => {
    await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

// Show single todo
app.get('/todo/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.render('show', { todo });
});

// Delete todo
app.delete('/todo/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// Start server
app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});

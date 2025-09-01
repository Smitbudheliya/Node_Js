const express = require('express');
const db = require('./config/db');
const Todo = require('./models/todoModel');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/image');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.render('todo');
});

app.post("/add", upload.single("image"), async (req, res) => {
    const { task, description, type, category } = req.body;

    await Todo.create({
        task,
        description,
        type,
        category: Array.isArray(category) ? category : (category ? [category] : []),
        image: req.file ? "/image/" + req.file.filename : ""   // 👈 store image path
    });

    res.redirect("/show");
});


app.get('/show', async (req, res) => {
    const todos = await Todo.find();
    console.log("Todos fetched:", todos.length);
    res.render('show', { todos });
});


app.get('/edit/:id', async (req, res) => {
    try {
        console.log("Edit route hit with id:", req.params.id);
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            console.log("Todo not found in DB");
            return res.status(404).send("Todo not found");
        }
        res.render('edit', { todo });
    } catch (err) {
        console.error("Edit Page Error:", err);
        res.status(500).send("Error loading edit page");
    }
});

app.post('/update/:id', upload.single("image"), async (req, res) => {
    try {
        const { task, description, type, category } = req.body;
        const todo = await Todo.findById(req.params.id);

        // agar purani image hai aur nayi image upload hui hai to delete karo
        if (req.file && todo.image) {
            const fs = require("fs");
            const oldPath = "public" + todo.image; 
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        await Todo.findByIdAndUpdate(req.params.id, {
            task,
            description,
            type,
            category: Array.isArray(category) ? category : (category ? [category] : []),
            image: req.file ? "/image/" + req.file.filename : todo.image
        });

        res.redirect('/show');
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).send("Error updating todo");
    }
});


app.get('/delete/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        // image delete
        if (todo.image) {
            const fs = require("fs");
            const oldPath = "public" + todo.image;
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        await Todo.findByIdAndDelete(req.params.id);
        res.redirect('/show');
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Error deleting todo");
    }
});



app.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        return;
    }
    console.log(`Server running on http://localhost:${port}`);
});

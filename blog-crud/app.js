const express = require('express');
const port = 8000;
const app = express();

const db = require('./config/db');
const path = require('path');
const TodoModel = require('./model/blogModel');
const multer = require('multer');

// storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);   
    }
});
const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.use(express.urlencoded());

// static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    return res.render('add');
});

app.get('/show', async (req, res) => {
    let data = await TodoModel.find();
    return res.render('show', {
        blog: data
    });
});

app.post('/formAdd', upload.single('profile'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    let blogData = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        profile: req.file.filename  // yaha file ka naam save karenge
    };

    await TodoModel.create(blogData);
    return res.redirect('show');
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`server is running on port ${port}`);
});

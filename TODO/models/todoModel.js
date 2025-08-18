const mongoose = require('../config/db');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'Open'
    }
});

module.exports = mongoose.model('Todo', todoSchema);

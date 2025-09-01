const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        default: []
    },
    image: {   // 👈 new field
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('Todo-Opretion', todoSchema);

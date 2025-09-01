const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud-todo')
  .then(() => {
    console.log('DB connected successfully'); // success message ke liye then block use kare
  })
  .catch(err => {
    console.error('Connection error:', err); // error handling ke liye catch block use kare
  });

module.exports = mongoose.connection;

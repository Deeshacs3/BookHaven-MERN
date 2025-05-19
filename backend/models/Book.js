const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    description: String,
    price: Number,
    publishedDate: Date
});

module.exports = mongoose.model('Book', bookSchema);

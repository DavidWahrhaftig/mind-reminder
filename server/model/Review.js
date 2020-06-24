const mongoose = require('mongoose');

// Create the User Schema
const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        default: 'Title is empty'
    },
    content: {
        type: String,
        default: 'Content is empty'
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
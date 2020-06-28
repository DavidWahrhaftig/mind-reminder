const mongoose = require('mongoose');

// Create the User Schema
const UserSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    reminders: [				
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Reminder"
		}
	],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
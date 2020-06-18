const mongoose = require('mongoose');

// Create the User Schema
const TimerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    period: {
        type: Number,
        required: true
    },
    enabled: {
        type: Boolean,
        default: true
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
	// 	ref: "User" 
    // }
});

// TimerSchema.post('remove', removeLinkedDocuments);

// function removeLinkedDocuments(timer) {
//     User.remove({_id: {$in: user.timers}});
// }

const Timer = mongoose.model('Timer', TimerSchema);

module.exports = Timer;
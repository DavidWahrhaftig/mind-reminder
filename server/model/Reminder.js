const mongoose = require('mongoose');
const reminderTypes = require('../optionTypes');

// Create the Timer Schema
const ReminderSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
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
        default: 1
    },
    enabled: {
        type: Boolean,
        default: true
    },
    settings: {
        type : {type: Number, default: reminderTypes.ONCE},
    //     regularity: {
    //         option: {type: Number, default: 0}, // Everyday, specific week days, specific calender date, between two dates 
    //         daysOfWeek: [{type: Number, required: false}],
    //         specificDate: {type:Date, required: true},
    //         range: {
    //             startDay: {type: Date},
    //             endDay: {type: Date}
    //         }
    //     }
    }
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
	// 	ref: "User" 
    // }
});

const Reminder = mongoose.model('Reminder', ReminderSchema);

module.exports = Reminder;
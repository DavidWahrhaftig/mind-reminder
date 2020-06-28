const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const passport = require('passport');
//const mongoose = require('mongoose');

const verifyToken = require('../verification');

const key = require('../../config/keys').secret;
const Reminder = require('../../model/Reminder');
const User = require('../../model/User');
const reminderTypes = require('../../optionTypes');

/**
 * @route GET api/reminders/
 * @desc Return the User's Data
 * @access Private
 */
// router.get('/', passport.authenticate('jwt', 
//     {
//         session: false
//     }), (req, res) => {
//         return res.json({
//             reminders: req.user.reminders      
//         });
// });

/**
 * @route GET api/reminders/
 * @desc Return the User's Reminders
 * @access Private?
 */
router.get('/', verifyToken,(req, res) => {
    jwt.verify(req.token, key, (err, authData) => {
        if(err) {
            res.sendStatus(403);
            console.log("forbidden 2");
        } else {
            // find user 
            User.findById(authData._id).populate('reminders').then(user => {
                const reminders = user.reminders;
                // console.log("In Timers Get Request");
                res.status(200).json({
                    success: true,
                    reminders,
                    reminderTypes,
                    msg: 'Get reminders Request allowed',
                    authData
                });
            }).catch(err => {
                res.status(404).json({
                    success: false,
                    msg: err.message
                });
            });
        }
    });
});


/**
 * @route Post api/reminders/
 * @desc Create New Reminder
 * @access Private?
 */
router.post('/', verifyToken,(req, res) => {
    jwt.verify(req.token, key, (err, authData) => {
        if(err) {
            res.sendStatus(403);
            console.log("forbidden 2");
        } else {
            // find user 
            User.findById(authData._id).populate('reminders').then(user => {
                // create new Timer
                // const newTimer = req.body.timer;
                const reminder = {
                    start: req.body.start,
                    end: req.body.end,
                    // period: req.body.period,
                    // name: req.body.name,
                    // settings: {
                    //     type: reminderTypes.ONCE
                    //     // regularity: req.body.regularity
                    // }
                }
                console.log("Creating New Reminder");
                console.log(reminder);
                Reminder.create(reminder).then(newReminder => {
                    // add timer to user and save
                    console.log("after Creating timer before sending status");
                    console.log(newReminder);
                    user.reminders.push(newReminder);
                    user.save();
                    // send response
                    res.status(201).json({
                        success: true,
                        reminder: newReminder,
                        msg: 'Created New Reminder!',
                    });
                }).catch(err => {
                    res.status(400).json({
                        success: false,
                        msg: err.message
                    });
                });
            }).catch(err => {
                res.status(404).json({
                    success: false,
                    msg: err.message
                });
            });
        }
    });
}); 

/**
 * @route Put api/reminders/
 * @desc Update reminder
 * @access Private
 */
router.put('/', verifyToken,(req, res) => {
    jwt.verify(req.token, key, (err, authData) => {
        if(err) {
            res.sendStatus(403);
            console.log("forbidden 2");
        } else {
            // maybe need to find user to ensure the right user is updating their timers
            // find timer
            console.log('updating reminder');
            // console.log(req.body);
            Reminder.findByIdAndUpdate(req.body.id, req.body.reminder, {new: true}).then(updatedReminder => {
                res.status(200).json({
                    success: true,
                    reminder: updatedReminder,
                    msg: 'Updated Reminder!',
                });
            }).catch(err => {
                res.status(404).json({
                    success: false,
                    msg: "Failed to update reminder."
                });
            })
        }
    });
});

/**
 * @route Delete api/reminders/
 * @desc Delete timer
 * @access Private
 */
router.delete('/', verifyToken,(req, res) => {
    jwt.verify(req.token, key, (err, authData) => {
        if(err) {
            res.sendStatus(403);
            console.log("forbidden 2");
        } else {
            // maybe need to find user to ensure the right user is deleting their timer
            // find timer
            // doesn't remove from User.timers array in Users collection
            // Remove timer from user's timers array
            console.log("Deleting, showing req.body")
            console.log(req.body);
            Reminder.findByIdAndRemove(req.body.id).then(removedReminder => {
                // find User
                // User.update({} , {$pull: {timers: removedTimer._id}});
                User.findById(authData._id).then(user => {
                    //const objectId = mongoose.Types.objectId(removedTimer._id);
                    user.reminders.pull({ _id: req.body.id});
                    user.save();
                    res.status(200).json({
                        success: true,
                        msg: 'Reminder Deleted!',
                    });
                }).catch(err => {
                    res.status(404).json({
                        success: false,
                        msg: "Failed to delete reminder from user's reminders array."
                    });
                }); 
            }).catch(err => {
                res.status(404).json({
                    success: false,
                    msg: "Failed to delete reminder."
                });
            })
        }
    });
});

            

// // FORMAT OF TOKEN 
// // Authorization: Bearer <access_token>
// function verifyToken(req, res, next) {
//     const bearerHeader = req.headers['authorization']; // needs to be 'authorization' and not 'Authorization'

//     if(typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(' ');
//         // Get token 
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     } else {
//         // Forbidden
//         console.log("forbidden 1");
//         res.sendStatus(403);
//     }
// }

module.exports = router;
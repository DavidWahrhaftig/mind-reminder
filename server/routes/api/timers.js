const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const passport = require('passport');
//const mongoose = require('mongoose');

const key = require('../../config/keys').secret;
const Timer = require('../../model/Timer');
const User = require('../../model/User');

/**
 * @route GET api/timers/
 * @desc Return the User's Data
 * @access Private
 */
// router.get('/', passport.authenticate('jwt', 
//     {
//         session: false
//     }), (req, res) => {
//         return res.json({
//             timers: req.user.timers      
//         });
// });

/**
 * @route GET api/timers/
 * @desc Return the User's Timers
 * @access Private?
 */
router.get('/', verifyToken,(req, res) => {
    jwt.verify(req.token, key, (err, authData) => {
        if(err) {
            res.sendStatus(403);
            console.log("forbidden 2");
        } else {
            // find user 
            User.findById(authData._id).populate('timers').then(user => {
                const timers = user.timers;
                // console.log("In Timers Get Request");
                res.status(200).json({
                    success: true,
                    timers,
                    msg: 'Get timers Request allowed',
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
 * @route Post api/timers/
 * @desc Create New Timer
 * @access Private?
 */
router.post('/', verifyToken,(req, res) => {
    jwt.verify(req.token, key, (err, authData) => {
        if(err) {
            res.sendStatus(403);
            console.log("forbidden 2");
        } else {
            // find user 
            User.findById(authData._id).populate('timers').then(user => {
                // create new Timer
                // const newTimer = req.body.timer;
                const timer = {
                    start: req.body.start,
                    end: req.body.end,
                    period: req.body.period,
                    name: req.body.name,
                }
                console.log("Creating New Timer");
                console.log(timer);
                Timer.create(timer).then(newTimer => {
                    // add timer to user and save
                    console.log("after Creating timer before sending status");
                    console.log(newTimer);
                    user.timers.push(newTimer);
                    user.save();
                    // send response
                    res.status(201).json({
                        success: true,
                        timer: newTimer,
                        msg: 'Created New Timer!',
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
 * @route Put api/timers/
 * @desc Update timer
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
            console.log('updating timer');
            console.log(req.body);
            Timer.findByIdAndUpdate(req.body.id, req.body.timer, {new: true}).then(updatedTimer => {
                res.status(200).json({
                    success: true,
                    timer: updatedTimer,
                    msg: 'Updated Timer!',
                });
            }).catch(err => {
                res.status(404).json({
                    success: false,
                    msg: "Failed to update timer."
                });
            })
        }
    });
});

/**
 * @route Delete api/timers/
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
            Timer.findByIdAndRemove(req.body.id).then(removedTimer => {
                // find User
                // User.update({} , {$pull: {timers: removedTimer._id}});
                User.findById(authData._id).then(user => {
                    //const objectId = mongoose.Types.objectId(removedTimer._id);
                    user.timers.pull({ _id: req.body.id});
                    user.save();
                    res.status(200).json({
                        success: true,
                        msg: 'Timer Deleted!',
                    });
                }).catch(err => {
                    res.status(404).json({
                        success: false,
                        msg: "Failed to delete timer from user's timers array."
                    });
                }); 
            }).catch(err => {
                res.status(404).json({
                    success: false,
                    msg: "Failed to delete timer."
                });
            })
        }
    });
});

            

// FORMAT OF TOKEN 
// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']; // needs to be 'authorization' and not 'Authorization'

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        // Get token 
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        console.log("forbidden 1");
        res.sendStatus(403);
    }
}

module.exports = router;
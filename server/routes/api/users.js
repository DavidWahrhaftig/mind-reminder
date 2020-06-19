const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
//const mongoose = require('mongoose');

const key = require('../../config/keys').secret;
const User = require('../../model/User');



/**
 * @route POST api/users/register
 * @desc Register the User 
 * @access Public
 */
router.post('/register', async (req, res) => {
    let { 
        // name, 
        username, 
        email, 
        password, 
        confirm_password 
    } = req.body

    if(password !== confirm_password) {
        return res.status(400).json({
            msg: "Passwords do not match."
        });
    }

    // try {
    // check for unique Username
    const foundUsername = await User.findOne({username: username}); //.catch( e => console.log(e));
    if (foundUsername) {
        console.log("User Already exists!");
        return res.status(400).json({
            msg: "Username is already taken"
        });
    }
    // check for unique Email
    const foundEmail = await User.findOne({email: email});
    if (foundEmail) {
        console.log("Email Already exists!");
        return res.status(400).json({
            msg: "Email is already registered. Forgot your password?"
        });
    }
    // } catch (err) {
    //     console.log(err);
    // }
    

    // check for unique Username
    // User.findOne({
    //     username: username
    // }).then( user => {
    //     if (user) {
    //         return res.status(400).json({
    //             msg: "Username is already taken"
    //         });
    //     }
    // });

    // check for unique Email
    // User.findOne({
    //     email: email
    // }).then( user => {
    //     if (user) {
    //         console.log("shouldn't get here");
    //         return res.status(400).json({
    //             msg: "Email is already registered. Forgot your password?"
    //         });
    //     }
    // });
    
    console.log("only get here if everything is valid!");
    // The data is valid and new user can be registered
    
    let newUser = new User({
        // name,
        username,
        password,
        email
    });

    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    user: user,
                    msg: "User is now registered."
                });
            });
        });
    });
    
});

/**
 * @route POST api/users/login
 * @desc Login the User 
 * @access Public
 */
router.post('/login', (req, res) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if(!user) {
                // user does not exist
                console.log("user name incorrect");
                return res.status(404).json({
                    msg: "Username not found.",
                    success: false
                });
            }
            console.log("only get here if username exists!");
            // user exists, check password match
            bcrypt.compare(req.body.password, user.password)
                .then( isMatch => {
                    if (isMatch) {
                        // User's password is correct and send the JSON Token for that user    
                        const payload = {
                            _id: user._id,
                            // name: user.name,
                            email: user.email,
                            username: user.username
                        }
                        // sign token
                        jwt.sign(payload, key, { 
                            expiresIn: 604800 // a week in seconds, user will be logged in for a week
                        }, (err, token) => {
                            res.status(200).json({
                                success: true,
                                user: payload, // from database
                                token: `Bearer ${token}`,
                                msg: "You are now logged in."
                            });
                        });
                        
                    } else {
                        return res.status(404).json({
                            msg: "Incorrect password.",
                            success: false
                        });
                    }
                });
        });
});

/**
 * @route GET api/users/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt', 
    {
        session: false
    }), (req, res) => {
        console.log("Profile Get Request");
        return res.json({
            user: req.user      
        });
});
// router.get('/profile', verifyToken, (req, res) => {
//     jwt.verify(req.token, key, (err, authData) => {
//         if(err) {
//             res.sendStatus(403);
//             console.log("forbidden 2");
//         } else {
//             // find user 
//             User.findById(authData._id).then(user => {
//                 res.status(200).json({
//                     success: true,
//                     user,
//                     msg: 'User Found',
//                 });
//             }).catch(err => {
//                 res.status(404).json({
//                     success: false,
//                     msg: err.message
//                 });
//             });
//         }
//     });
// });

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
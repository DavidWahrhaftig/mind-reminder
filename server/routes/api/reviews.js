const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const verifyToken = require('../verification');
const key = require('../../config/keys').secret;
const Review = require('../../model/Review');
// const User = require('../../model/User');

/**
 * @route GET api/reviews/
 * @desc Return all the Reviews
 * @access Private?
 */
router.get('/', verifyToken,(req, res) => {
    jwt.verify(req.token, key, (err, authData) => {
        if(err) {
            res.sendStatus(403);
            console.log("forbidden 2");
        } else {
            // find user
            Review.find({}).populate('user').then(reviews => {
                res.status(200).json({
                    success: true,
                    reviews,
                    msg: 'Get Reviews Request Success',
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
 * @route Post api/reviews/
 * @desc Create New Review
 * @access Private?
 */
router.post('/', verifyToken,(req, res) => {
    jwt.verify(req.token, key, (err, authData) => {
        if(err) {
            console.log("forbidden 2");
            return res.sendStatus(403);
        }
        // create new review
        let {  
            title, 
            content,
            date
        } = req.body

        Review.create({title, content, date, user: authData._id}).then(newReview => {
            res.status(201).json({
                success: true,
                timer: newReview,
                msg: 'Created New Review!',
            });
        }).catch(err => {
            res.status(400).json({
                success: false,
                msg: err.message
            });
        });
    
    });
});

/**
 * @route Delete api/reviews/
 * @desc Delete review
 * @access Private
 */
router.delete('/', verifyToken,(req, res) => {
    jwt.verify(req.token, key, (err, authData) => {
        if(err) {
            console.log("forbidden 2");
            return res.sendStatus(403);
        }
        Review.findByIdAndRemove(req.body.id).then(removedReview => {
            res.status(200).json({
                success: true,
                msg: 'Review Deleted!',
            });
        }).catch(err => {
            res.status(404).json({
                success: false,
                msg: "Failed to delete Review"
            });
        });
    });
});


module.exports = router;
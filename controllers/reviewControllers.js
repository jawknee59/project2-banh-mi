/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
const Banhmi = require('../models/banhmi')

/////////////////////////////////////
//// Create Router               ////
/////////////////////////////////////
const router = express.Router()

/////////////////////////////////////
//// Routes                      ////
/////////////////////////////////////

// POST -> `/reviews/<someFruitId>`
// only loggedin users can post reviews
// bc we have to refer to a banhmi, we'll do that in the simplest way via the route
router.post('/:banhmiId', (req, res) => {
    // first we get the banhmiId and save to a variable
    const banhmiId = req.params.banhmiId
    // then we'll protect this route against non-logged in users
    console.log('this is the session\n', req.session)
    if (req.session.loggedIn) {
        // if logged in, make the logged in user the author of the review
        // this is exactly like how we added the owner to our banhmis
        req.body.author = req.session.userId
        // saves the req.body to a variable for easy reference later
        const theReview = req.body
        // find a specific banhmi
        Banhmi.findById(banhmiId)
            .then(banhmi => {
                // create the review(with a req.body)
                banhmi.reviews.push(theReview)
                // save the banhmi
                return banhmi.save()
            })
            // respond with a 201 and the fruit itself
            .then(banhmi => {
                res.status(201).json({ banhmi: banhmi })
            })
            // catch and handle any errors
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    } else {
        res.sendStatus(401) //send a 401-unauthorized
    }
})

//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router
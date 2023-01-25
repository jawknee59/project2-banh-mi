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

// POST -> `/reviews/<someBanhmiId>`
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
            // respond with a 201 and the banhmi itself
            .then(banhmi => {
                // res.status(201).json({ banhmi: banhmi })
                res.redirect(`/banhmis/${banhmi.id}`)
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

// DELETE -> `/reviews/delete/<someBanhmiId>/<someReviewId>`
// make sure only the author of the review can delete the review
router.delete('/delete/:banhmiId/:reviewId', (req, res) => {
    // isolate the ids and save to variables so we don't have to keep typing req.params
    const { banhmiId, reviewId } = req.params
    // get the banhmi
    Banhmi.findById(banhmiId)
        .then(banhmi => {
            // get the review, we'll use the built in subdoc method called .id()
            const theReview = banhmi.reviews.id(reviewId)
            console.log('this is the review to be deleted: \n', theReview)
            // then we want to make sure the user is loggedIn, and that they are the author of the review
            if (req.session.loggedIn) {
                // if they are the author, allow them to delete
                if (theReview.author == req.session.userId) {
                    // we can use another built in method - remove()
                    theReview.remove()
                    banhmi.save()
                    // res.sendStatus(204) //send 204 no content
                    res.redirect(`/banhmis/${banhmi.id}`)
                } else {
                    // otherwise send a 401 - unauthorized status
                    // res.sendStatus(401)
                    res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20review`)

                }
            } else {
                // otherwise send a 401 - unauthorized status
                //res.sendStatus(401)
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20review`)
            }
        })
        .catch(err => {
            console.log(err)
            //res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router
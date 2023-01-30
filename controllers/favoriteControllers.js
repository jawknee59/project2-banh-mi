/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
require('dotenv').config()
const Favorite = require('../models/favorite')
const Banhmi = require('../models/banhmi')

/////////////////////////////////////
//// Create Router               ////
/////////////////////////////////////
const router = express.Router()

/////////////////////////////////////
//// Routes                      ////
/////////////////////////////////////

// GET Route
router.get('/', (req, res) => {
    const { username, loggedIn, userId} = req.session
    Favorite.find({})
        .then(favorites => {
            // res.json( {banhmis: banhmis})
            res.render('favorite/index.liquid', { favorites, username, loggedIn, userId})
        })
        .catch(err => {
            console.log('This is the occurring error: ', err)
            res.json({ err })
        })
})

// POST -> `/favorites`
router.post('/', (req, res) => {
    // const { viet, english, includes, price } = req.body
    const { username, loggedIn, userId} = req.session
    //console.log('this is the owner loggedIn: \n', username, userId)
    // console.log('this is banhmiId: \n', req.body.banhmiId)
    // console.log('this is banhmi viet name: \n', viet)
    // console.log('this is banhmi english name: \n', english)
    // console.log('this is banhmi includes: \n', includes)
    // console.log('this is banhmi price: \n', price)
    req.body.owner = req.session.userId
    console.log('this is the username, loggedIn, UserId', req.session)
    if (req.session.loggedIn) {
        // if logged in, make the logged in user the author of the review
        const fav = {
            banhmiId: req.body.banhmiId,
            owner: req.session.userId,
            viet: req.body.viet,
            english: req.body.english,
            includes: req.body.includes,
            price: req.body.price
        }
        console.log('this is my fav object', fav)
        // this is exactly like how we added the owner to our banhmis
        Favorite.create(fav)
            .then(({}) => {
                res.redirect('banhmis')
            })
            .catch(err => {
                console.log('This is the following error: ', err)
            })

    }    
})

// DELETE Route



//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router


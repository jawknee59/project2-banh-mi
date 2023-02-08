/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
require('dotenv').config()
const Cart = require('../models/cart')

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
    console.log('this is the owner of cart:\n', {owner: req.session.userId})
    Cart.find({})
        .populate('items')
        .then(carts => {
            console.log('this is the carts from navbar:\n', carts)
            res.render('cart/index.liquid', { carts, ...req.session})
        })
        .catch(err => {
            console.log('This is the occurring error: ', err)
            res.json({ err })
        })
})



// Post Route - creating a cart w/ users
router.post('/:banhmiId', (req, res) => {
	const banhmiId = req.params.banhmiId
    req.body.owner = req.session.userId
    if (req.session.loggedIn) {
        // if logged in, make the logged in user the author of the review
        // console.log('this is my fav object', fav)
        // this is exactly like how we added the owner to our banhmis
        Cart.create({owner: req.session.userId})
            .then(cart => {
                console.log('this is the cart from adding banhmi', cart, banhmiId) 
                cart.items.push(banhmiId)
                res.redirect('/banhmis')
            })
            .catch(err => {
                console.log('This is the following error: ', err)
            })

    }    
})

//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router
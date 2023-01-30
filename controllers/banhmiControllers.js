/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
require('dotenv').config()
const Banhmi = require('../models/banhmi')

/////////////////////////////////////
//// Create Router               ////
/////////////////////////////////////
const router = express.Router()

/////////////////////////////////////
//// Routes                      ////
/////////////////////////////////////
// INDEX route 
// Read -> finds and displays all banhmis
router.get('/', (req, res) => {
    const { username, loggedIn, userId} = req.session
    Banhmi.find({})
        .then(banhmis => {
            // res.json( {banhmis: banhmis})
            res.render('banhmi/', { banhmis, username, loggedIn, userId})
        })
        .catch(err => {
            console.log('This is the occurring error: ', err)
            res.json({ err })
        })
})

// CREATE route 
// Create -> receives a request body, and creates a new document in the database
router.post('/', (req, res) => {
    const newBanhmi = req.body
    console.log('This is req.body aka newBanhmi \n', newBanhmi)
    Banhmi.create(newBanhmi)
        .then(banhmi => {
            res.status(201).json({ banhmi: banhmi.toObject() })
        })
        .catch(err => {
            console.log('The following error occurred: \n', err)
            res.json({ err })
        })
})

// UPDATE route
// Update -> a specific banhmi
router.put('/:id', (req, res) => {
    const id = req.params.id
    Banhmi.findByIdAndUpdate(id, req.body, { new: true })
        .then(banhmi => {
            res.sendStatus(204)
        })
        .catch(err => {
            console.log(err)
            res.json({ err })
        })
})

// DELETE route
// Delete -> a specific banhmi
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Banhmi.findByIdAndRemove(id)
        .then(() => {
            res.sendStatus(204)
        })
        .catch(err => {
            // console.log(err)
            res.json({ err })
        })
})

// SHOW route
// Read -> finds and displays a single resource
router.get('/:id', (req, res) => {
    const { username, loggedIn, userId} = req.session
    const id = req.params.id
    Banhmi.findById(id)
        .populate('reviews.author', 'username')
        .then(banhmi => {
            // res.json({ banhmi: banhmi })
            res.render('banhmi/show.liquid', { banhmi, ...req.session })
        })
        .catch(err => {
            // console.log(err)
            // res.json({ err })
            res.redirect(`/error?error=${err}`)
        })
})

//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router
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

// GET for the new page
// shows a form where a user can create a new banh mi
router.get('/new', (req, res) => {
    res.render('banhmi/new', { ...req.session })
})

// CREATE route 
// Create -> receives a request body, and creates a new document in the database
router.post('/', (req, res) => {
    const newBanhmi = req.body
    console.log('This is req.body aka newBanhmi \n', newBanhmi)
    Banhmi.create(newBanhmi)
        .then(banhmi => {
            //res.status(201).json({ banhmi: banhmi.toObject() })
            res.redirect(`/banhmis/${banhmi.id}`)
        })
        .catch(err => {
            console.log('The following error occurred: \n', err)
            //res.json({ err })
            res.redirect(`/error?error=${err}`)
        })
})

// GET route
// Index -> This is a user specific index route
// this will only show the logged in user's banhmis
router.get('/mine', (req, res) => {
    // find banhmis by ownership, using the req.session info
    Banhmi.find({ owner: req.session.userId })
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        .then(banhmis => {
            // if found, display the banhmis
            // res.status(200).json({ banhmis: banhmis })
            res.render('banhmi/index', { banhmis, ...req.session })
        })
        .catch(err => {
            // otherwise throw an error
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET route for getting json for specific user banhmis
// Index -> This is a user specific index route
// this will only show the logged in user's banhmis
router.get('/json', (req, res) => {
    // find banhmis by ownership, using the req.session info
    Banhmi.find({ owner: req.session.userId })
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        .then(banhmis => {
            // if found, display the banhmis
            res.status(200).json({ banhmis: banhmis })
            // res.render('banhmis/index', { banhmis, ...req.session })
        })
        .catch(err => {
            // otherwise throw an error
            console.log(err)
            res.status(400).json(err)
        })
})

// GET request -> edit route
// shows the form for updating a banhmi
router.get('/edit/:id', (req, res) => {
    // because we're editing a specific banhmi, we want to be able to access the banhmi's initial values. so we can use that info on the page.
    const banhmiId = req.params.id
    Banhmi.findById(banhmiId)
        .then(banhmi => {
            res.render('banhmi/edit', { banhmi, ...req.session })
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
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
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

// // SEED Route
// router.get('/seed', (req, res) => {
//     // array of starter banh mis
//     const banhMiVegs = ['daikon','carrot', 'onion','jalapeno','cilantro','house mayonnaise']
//     const startBanhmis = [
//         {
//             viet: 'Thit Nguoi', 
//             english: 'Assorted Vietnamese Ham',
//             includes: banhMiVegs,
//             price: 6
//         },
//         { 
//             viet: 'Xiu Mai', 
//             english: 'Meatball',
//             includes: banhMiVegs,
//             price: 6
//         }, 
//         { 
//             viet: 'Xa Xiu', 
//             english: 'BBQ Pork',
//             includes: banhMiVegs,
//             price: 6
//         }, 
//         { 
//             viet: 'Thit Bo Nuong', 
//             english: 'Charbroiled Beef',
//             includes: banhMiVegs,
//             price: 6
//         }, 
//         { 
//             viet: 'Thit Ga Nuong', 
//             english: 'Charbroiled Chicken',
//             includes: banhMiVegs,
//             price: 6
//         }, 
//         { 
//             viet: 'Thit Heo Nuong', 
//             english: 'Charbroiled Pork',
//             includes: banhMiVegs,
//             price: 6
//         }, 
//         { 
//             viet: 'Bi', 
//             english: 'Shredded Pork with Skin',
//             includes: banhMiVegs,
//             price: 6
//         }, 
//         { 
//             viet: 'Ga', 
//             english: 'Chicken',
//             includes: banhMiVegs,
//             price: 6
//         }, 
//         { 
//             viet: 'Cha Ca', 
//             english: 'Fish Patty',
//             includes: banhMiVegs,
//             price: 6
//         }, 
//         { 
//             viet: 'Cha Lua', 
//             english: 'Pork Bologna',
//             includes: banhMiVegs,
//             price: 6
//         }, 
//         { 
//             viet: 'Chay', 
//             english: 'Vegetarian',
//             includes: banhMiVegs,
//             price: 6
//         }, 
//     ]
//     // delete every banh mis in the database
//     Banhmi.deleteMany({})
//         .then(() => {
//             // create the seed data for banhmis
//             Banhmi.create(startBanhmis)
//                 // promise chain for our db, success and failures
//                 .then(data => {
//                     // console.log('Here are the created banh mis: \n', data)
//                     res.json(data)

//                 })
//                 .catch(err => {
//                     // console.log('The following error occurred: \n', err)
//                     res.json({ err })
//                 })
//         })
    
// })

// INDEX route 
// Read -> finds and displays all banhmis
router.get('/', (req, res) => {
    const { username, loggedIn, userId} = req.session
    Banhmi.find({})
        .populate('owner', 'username')
        .populate('reviews.author', '-password')
        .then(banhmis => {
            // res.json( {banhmis: banhmis})
            res.render('banhmi/', { banhmis, username, loggedIn, userId})
        })
        .catch(err => {
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
    const id = req.params.id
    Banhmi.findById(id)
        .then(banhmi => {
            // res.json({ banhmi: banhmi })
            res.render('banhmi/show.liquid', { banhmi })
        })
        .catch(err => {
            // console.log(err)
            res.json({ err })
        })
})

//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router
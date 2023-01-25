// // import dependencies
// const mongoose = require('./connection')
// const Banhmi = require('./banhmi')

// const db = mongoose.connection

// db.on('open', () => {
//     // array of starter banh mis
//     const banhMiVegs = ['daikon','carrot', 'onion','jalapeno','cilantro','house mayonnaise']
//     const startBanhmis = [
//         {
//             viet: 'Thit Nguoi', english: 'Assorted Vietnamese Ham',
//             includes: banhMiVegs,
//             price: 6
//         },
//         { 
//             viet: 'Xiu Mai', english: 'Meatball',
//             includes: banhMiVegs,
//             price: 6
//         }, 
//         { 
//             viet: 'Xa Xiu', english: 'BBQ Pork',
//             includes: banhMiVegs,
//             price: 6
//         }, 
//         { 
//             viet: 'Thit Nuong', english: 'Charbroiled Pork',
//             includes: banhMiVegs,
//             price: 6
//         }, 
//         { 
//             viet: 'Bi', english: 'Shredded Pork with Skin',
//             includes: banhMiVegs,
//             price: 6
//         }, 
//         { 
//             viet: 'Ga', english: 'Chicken',
//             includes: banhMiVegs,
//             price: 6
//         }, 
//     ]
//     // delete every banh mis in the database
//     Banhmi.deleteMany({ owner: null })
//         .then(() => {
//             // create the seed data for banhmis
//             Banhmi.create(startBanhmis)
//                 // promise chain for our db, success and failures
//                 .then(data => {
//                     console.log('Here are the created banh mis: \n', data)
//                     // res.json(data)
//                     db.close()

//                 })
//                 .catch(err => {
//                     console.log('The following error occurred: \n', err)
//                     // res.json({ err })
//                     db.close()
//                 })
//         })
    
// })
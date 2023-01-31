/////////////////////////////////////////////////////////
//// Schema for the review subdocument               ////
/////////////////////////////////////////////////////////
const mongoose = require('./connection')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const favoriteSchema = new Schema ({
    banhmiId: {
        type: String
    },
    viet: { 
        type: String
    },
    english: { 
        type: String
    },
    includes: { 
        type: Array
    },
    price: { 
        type: Number
    },
    owner: {
        type: String
    }
})

const Favorite = model('Favorite', favoriteSchema)

////////////////////////////////////
//// Export Schema              ////
////////////////////////////////////
module.exports = Favorite


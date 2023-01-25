/////////////////////////////////////////////////////////
//// Schema for the review subdocument               ////
/////////////////////////////////////////////////////////
const mongoose = require('./connection')

// destructure the schema function from mongoose
const { Schema } = mongoose

// review schema
const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

////////////////////////////////////
//// Export Schema              ////
////////////////////////////////////
module.exports = reviewSchema
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
        min: 1,
        max: 5
    },
    note: {
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



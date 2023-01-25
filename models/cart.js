/////////////////////////////////////////////////////////
//// Schema for the review subdocument               ////
/////////////////////////////////////////////////////////
const mongoose = require('./connection')

// destructure the schema function from mongoose
const { Schema } = mongoose

const cartSchema = new Schema ({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Banhmi',
            qty: {
                type: Number,
                default: 1
            },
            price: {
                type: Number,
                default: 0
            }
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    }
})

////////////////////////////////////
//// Export Schema              ////
////////////////////////////////////
module.exports = cartSchema
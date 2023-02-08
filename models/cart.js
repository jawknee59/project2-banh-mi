/////////////////////////////////////////////////////////
//// Schema for the review subdocument               ////
/////////////////////////////////////////////////////////
const mongoose = require('./connection')

// destructure the schema function from mongoose
const { Schema, model } = mongoose

const cartSchema = new Schema ({
    
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Banhmi'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    totalPrice: {
        type: Number,
        default: 0
    }
})

const Cart = model('Cart', cartSchema)

////////////////////////////////////
//// Export Schema              ////
////////////////////////////////////
module.exports = Cart
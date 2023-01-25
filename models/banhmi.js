// import dependencies
const mongoose = require('./connection')
// import reviewSchema to use as a subdocument
const reviewSchema = require('./review')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

// banhmi schema
const banhmiSchema = new Schema({
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
			type: Schema.Types.ObjectID,
			ref: 'User',
		},
        reviews: [reviewSchema]
	}, { timestamps: true })

const Banhmi = model('Banhmi', banhmiSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Banhmi
// import dependencies
const mongoose = require('./connection')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const banhmisSchema = new Schema(
	{
		vietName: { 
            type: String, 
            required: true 
        },
		englishName: { 
            type: String, 
            required: true 
        
        },
        includes: { 
            type: Array, 
            required: true 
        },
		price: { 
            type: Number, 
            required: true 
        }
        // ,
		// owner: {
		// 	type: Schema.Types.ObjectID,
		// 	ref: 'User',
		// }
	},
	{ timestamps: true }

)

const Banhmi = model('Banhmi', banhmisSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Banhmi

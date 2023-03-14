const mongoose = require('mongoose')
const { Schema, model } = mongoose

const itemSchema = new Schema(
	{
		style: { 
			type: String, 
			required: true 
		},
		size: [
            String
        ],
		img:{
        	type: String
    	},
		img1:{
			type: String
		},
		img2:{
			type: String
		},
        price: {
			 type: Number,
			required: true 
		},
		title: { 
			type: String, 
			required: true 
		},
        color: { 
			type: String, 
			required: true 
		},
		
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Item', itemSchema)

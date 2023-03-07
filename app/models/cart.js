
const mongoose = require('mongoose')
const { Schema, model } = mongoose


//=================== CART SCHEMA ==============
const cartSchema = new Schema ({

    products:[
        {type: Schema.Types.ObjectId,
        ref: 'Item'} 
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
    
},{
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}
)

//////////// VIRTUALS - Total Price calculator for the Cart

// cartSchema.virtual('totalPrice').get( function () {
//     let total = 0
//     this.items.forEach(item => {
//        total +=item.price})
//     return total 
// })
// const Cart = model('Cart', cartSchema)

// cartSchema.virtual('totalPrice').get(function () {
//     let total = 0;
//     this.products.forEach((product) => {
//         total += product.price;
//     });
//     return total;
// });

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = mongoose.model('Cart', cartSchema)


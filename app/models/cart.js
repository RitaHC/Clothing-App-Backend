
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

// Virtual that iterates over items and creates a counter
// cartSchema.virtual('ItemsInCart').get(function () {

//     // Craete an object that stores the data of how many times an Item is added to the cart
//     const reps = {}
//     this.products.forEach((item) => {
//     const id = item.id
//     if (item.id && !(item.id in reps)) {
//         item.id = { count: 1 }
//     } else if (item.id) {
//         item.id.count++
//     }
//     })
//     /// Now Loop over this object to show the key and values

// })

// Virtual that iterates over items and creates a counter
cartSchema.virtual('ItemsInCart').get(function () {

    // Create an object that stores the data of how many times an Item is added to the cart
    const reps = {};
    this.products.forEach((item) => {
      const id = item.id;
      if (id && !(id in reps)) {
        reps[id] = { count: 1 };
      } else if (id) {
        reps[id].count++;
      }
    });
  
    // Now Loop over this object to show the key and values
    for (const [key, value] of Object.entries(reps)) {
      console.log(`${key}: ${value.count}`);
    }
  
  });

  
/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = mongoose.model('Cart', cartSchema)


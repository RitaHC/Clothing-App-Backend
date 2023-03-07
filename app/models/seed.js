const mongoose = require('mongoose')
const db = require('../../config/db')

const Item = require('./item')



/////////////////////// Seed Data /////////////////////




// Seed Items
const seed = [
    {
        style: 'T-Shirt',
        size: [ 'XS','S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'X4L', 'Customize'],      
        img: 'https://media.istockphoto.com/id/1263934565/photo/attractive-smiling-young-woman.jpg?s=612x612&w=0&k=20&c=oDh3xZDVBnqnL_g3sQOc0QdtyrfePfLPCI1sTUcUbk4=',
        price: 30,
        title: 'Flush Yellow top made out of vegan, breathable fabric',
        color: 'yellow'
    },
    {
        style: 'Accessory',
        size: ['Fit all'],      
        img: 'https://media.istockphoto.com/id/1409447976/photo/african-woman-with-long-braids-hair-black-and-white-concept-beauty-model-in-big-hat-hidden.jpg?s=612x612&w=0&k=20&c=Lhhnt1u34QxHJ5QYZtOdovf19JkqfqYIfRY1Ouma8MU=',
        price: 10,
        title: 'Stylish hat for summers',
        color: 'yellow'
    },
    
]

// mongoose.connect(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//     }).then(() => {
//         Item.deleteMany()
//         .then(() => {
//             Item.create(seed)
//                 .then(items => {
//                     console.log(items)
//                     mongoose.connection.close()
//                 })
//                 .catch(error => {
//                     console.log(error)
//                     mongoose.connection.close()
//                     })
//         })    
//         }).catch(error => {
//             console.log(error)
//             mongoose.connection.close()
//         })
  
// mongoose.connect(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }).then(() => {
//     Item.deleteMany().then(deletedItems => {
//       console.log('the deleted items:', deletedItems);
//       // call seed() and pass the result to Item.create()
//       seed().then(items => {
//         Item.create(items).then(newItems => {
//           console.log('the new items', newItems)
//           mongoose.connection.close()
//         }).catch(error => {
//           console.log(error)
//           mongoose.connection.close()
//         })
//       }).catch(error => {
//         console.log(error)
//         mongoose.connection.close()
//       })
//     }).catch(error => {
//       console.log(error)
//       mongoose.connection.close()
//     })
//   }).catch(error => {
//     console.log(error)
//     mongoose.connection.close()
//   })
  

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    Item.deleteMany().then(deletedItems => {
      console.log('the deleted items:', deletedItems);
      Item.create(seed).then(newItems => {
        console.log('the new items', newItems)
        mongoose.connection.close()
      }).catch(error => {
        console.log(error)
        mongoose.connection.close()
      })
    }).catch(error => {
      console.log(error)
      mongoose.connection.close()
    })
  }).catch(error => {
    console.log(error)
    mongoose.connection.close()
  })

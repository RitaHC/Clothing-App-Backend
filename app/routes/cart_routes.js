const express = require('express')
const passport = require('passport')
const Item = require('../models/item')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const Cart = require('../models/cart')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()




//====================== INDEX CARTS =======================
// INDEX -> /cart/
// All Carts
router.get('/', (req,res)=> {
    Cart.find({})
        .then(cart => {
            console.log(`----CART INDEX--- No. of Carts`, cart.length)
            res.json({cart: cart})
            return 
        })
        .catch(err=> console.log(err))
})



// SHOW (active cart) -> /cart/:cartId

// UPDATE (cart checkout) -> /cart/update/:cartId
// Active f when order placed

//================================  CREATE AND PUSH ITEMS ==========================

// Create Cart (push item) -> /cart/:userId/:itemId

router.get('/:userId/:itemId', (req,res,next)=> {
    const user = req.params.userId
    const item = req.params.itemId
    console.log('----USER---', user)
    console.log('---ITEM---', item)

    //Find the cart or create one
    Cart.findOne({active: true , owner: user})
        .then(cart => {
            // If cart exists -> Push item
            if(cart) {
                console.log(`====== FIRST IF CONSOLE ======`, cart)
                cart.products.push(item)
                return cart.save()
                res.json({cart: cart})
            } else {
                // Else create a cart and push item
                Cart.create({owner: user})
                    .then(cart=> {
                        console.log(`=====FIRST ELSE ===`, cart)
                        cart.products.push(item)
                        return cart.save()
                    })
                    .catch(next)
            }
        })
        .catch(next)
})


// router.get('/:userId/:itemId', (req,res)=> {
//     const user = req.params.userId
//     const item = req.params.itemId
//     console.log('----USER---', user)
//     console.log('---ITEM---', item)

//     // Find the cart or create one
//     Cart.findOne({active: true , owner: user})
//         .then(cart => {
//             // If cart exists -> Push item
//             if(cart) {
//                 console.log(`====== FIRST IF CONSOLE ======`, cart)
//                 cart.products.push(item)
//                 return cart.save()
//                 // Else create a cart and push item
//             } else {
//                 Cart.create({owner: user})
//                     .then(cart=> {
//                         console.log(`=====FIRST ELSE ===`, cart)
//                         cart.products.push(item)
//                     })
//                     .catch(next)
//             }
//         })
//         .catch((cart) => {
//             if(cart) {
//                 console.log(`====== SECOND IF CONSOLE ======`, cart)
//                 cart.products.push(item)
//                 return cart.save()
//                 // Else create a cart and push item
//             } else {
//                 Cart.create({owner: user})
//                     .then(cart=> {
//                         console.log(`===== SECOND ELSE ===`, cart)
//                         cart.products.push(item)
//                     })
//                     .catch(next)
//             }
//         })
// })




// Update (remove item from cart) -> /cart/:cartId/:itemId



module.exports = router
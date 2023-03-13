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
router.get('/', (req,res, next)=> {
    Cart.find({})
        .populate('products')
        .then(carts => {
            console.log(`----CART INDEX--- No. of Carts`, carts.length)
            res.json({carts: carts})
            return 
        })
        .catch(next)
})




//====================== UPDATE CARTS (Checkout)=======================

// UPDATE (cart checkout) -> /cart/checkout/:cartId
// Active f when order placed
router.patch('/checkout/:cartId', (req,res, next) => {
    const cart = req.params.cartId
    Cart.findById(cart)
        .populate('products')
        .then(cart => {
            cart.active = false
            console.log(`ACTIVE TURN FALSE`, cart)
            cart.save()
        })
        .then(cart => res.json({cart: cart}))
        .catch(next)
})

//====================== SHOW CARTS =======================

// SHOW (active cart) -> /cart/:cartId
// router.get('/:cartId', (req,res, next)=> {
//     const cart = req.params.cartId
//     Cart.findById(cart)
//         .then(cart => {
//             console.log(`--- Cart Show Page`, cart)
//             res.json({cart: cart})
//         })
//         .catch(next)
// })

router.get('/:userId', (req,res,next) => {
    const user = req.params.userId
    Cart.findOne({owner: user, active: true})
        .populate('products')
        .then(cart => {
            if(cart){
                console.log(`------ CART EXIST -----`)
                res.json({cart:cart})
            } else {
                Cart.create({owner: user})
                    .then(cart=> {
                        console.log(`---- NEW CART CREATED -----`)
                        res.json({cart:cart})
                    })
            }
        })
})


//================================  CREATE AND PUSH ITEMS ==========================

// Create Cart (push item) -> /cart/:userId/:itemId

router.post('/:userId/:itemId', (req,res,next)=> {
    const user = req.params.userId
    const item = req.params.itemId
    console.log('----USER---', user)
    console.log('---ITEM---', item)

    //Find the cart or create one
    Cart.findOne({active: true , owner: user})
        .populate('products')
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

// =================== Remove 1 =================
// router.patch('/remove/:userId/:cartId/:itemId', (req, res, next)=> {
//     const cartId = req.params.cartId
//     const itemId = req.params.itemId
//     const userId = req.params.userId
//     Cart.updateOne({ _id: cartId, owner: userId, active: true}, { $pull: { products: itemId } })
//         .populate('products')
//         .then(cart => {
//             console.log(`----Pop Item---`, cart)
//             res.status(200).send(cart)
//         })
//         .catch(next)
// })

// router.patch('/remove/:userId/:cartId/:itemId', (req, res, next)=> {
//     const cartId = req.params.cartId;
//     const itemId = req.params.itemId;
//     const userId = req.params.userId;

//     Cart.findOneAndUpdate(
//         { _id: cartId, owner: userId, active: true, products: itemId },
//         { $pull: { products: itemId } },
//         { new: true, populate: 'products' }
//     )
//     .then(cart => {
//         if (!cart) {
//             return res.status(404).send('Cart not found');
//         }

//         console.log(`Removed item ${itemId} from cart`, cart);
//         res.status(200).send(cart);
//     })
//     .catch(next);
// });

router.patch('/remove/:userId/:cartId/:itemId', (req, res, next)=> {
    const cartId = req.params.cartId;
    const itemId = req.params.itemId;
    const userId = req.params.userId;

    Cart.findOne({ _id: cartId, owner: userId, active: true })
        .populate('products')
        .then(cart => {
            if (!cart) {
                return res.status(404).send('Cart not found');
            }
            // Find the index of the an item with this id
            const index = cart.products.findIndex(product => product._id.equals(itemId));
            if (index === -1) {
                return res.status(404).send('Item not found in cart');
            }
            // Slplicing out 1 item at that index
            cart.products.splice(index, 1);
            return cart.save();
        })
        .then(cart => {
            console.log(`Removed item ${itemId} from cart`, cart);
            res.status(200).send(cart);
        })
        .catch(next);
});


  

//====================== UPDATE CARTS (remove All Items)=======================

// Update (remove item from cart) -> /cart/:cartId/:itemId
router.patch('/:userId/:cartId/:itemId', (req, res, next)=> {
    const cartId = req.params.cartId
    const itemId = req.params.itemId
    const userId = req.params.userId
    Cart.updateOne({ _id: cartId, owner: userId, active: true }, { $pull: { products: itemId } })
        .populate('products')
        .then(cart => {
            console.log(`----Pop Item---`, cart)
            res.status(200).send(cart)
        })
        .catch(next)
})


// Update (remove item from cart) -> /cart/:cartId/:itemId
// router.patch('/:userId/:cartId/:itemId', (req,res, next)=> {
//     const cart = req.params.cartId
//     const item = req.params.itemId
//     const user = req.params.userId
//     Cart.findOne({active: true , owner: user})
//         .then(cart => {
//             console.log(`----Pop Item---`, cart)
//             const nCart = cart.filter(product => product !== item)
//             return nCart
//         })
//         .catch(next)
// })

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








module.exports = router
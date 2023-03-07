
const express = require('express')
const passport = require('passport')
const Item = require('../models/item')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })


const router = express.Router()

// INDEX -> /items/
// GET / Items
// This will show all the items on a page

router.get('/', (req,res) => {
	Item.find({})
		.then(items=> {
			console.log(`This is INDEX items`, items)
			res.status(200).json({items: items})
		})
})


// SHOW -> /items/:itemId
// GET / Item
// This will show one item on a page


router.get('/:itemId', (req,res) =>{
	const id = req.params.itemId
	Item.findById(id)
		.then(item => {
			console.log(`This is SHOW ITEM`, item)
			res.status(200).json({item:item})
		})
})



module.exports = router

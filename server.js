// require necessary NPM packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
////////////////////////////////////////
const bodyparser = require('body-parser')
const stripe = require('stripe')('sk_test_51MjOxGGWn0da1VDTUWK22U0AZYQIbKTMLHK38UwqwApO0HuX3BLgpi8yHcyKLf1sfYTpMlYdcX7tsA3jr6HHW5UY00hIPnYgZd')
const uuid = require('uuid').v4

//////////////// SEARCH BAR ///////////
const algoloasearch = require('algoliasearch')('9a53e299ada486948be053c276b7500f')



/////////////////////////////////////////

// require route files
const itemRoutes = require('./app/routes/item_routes')
const userRoutes = require('./app/routes/user_routes')
const cartRoutes = require('./app/routes/cart_routes')

// require middleware
const errorHandler = require('./lib/error_handler')
const replaceToken = require('./lib/replace_token')
const requestLogger = require('./lib/request_logger')

// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require('./config/db')

// require configured passport authentication middleware
const auth = require('./lib/auth')

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 8000
const clientDevPort = 3000

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
mongoose.connect(db, {
	useNewUrlParser: true,
})

// instantiate express application object
const app = express()

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(
	cors({
		origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}`,
	})
)

// define port for API to run on
// adding PORT= to your env file will be necessary for deployment
const port = process.env.PORT || serverDevPort

// this middleware makes it so the client can use the Rails convention
// of `Authorization: Token token=<token>` OR the Express convention of
// `Authorization: Bearer <token>`
app.use(replaceToken)

// register passport authentication middleware
app.use(auth)

// add `express.json` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(express.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))

// log each request as it comes in for debugging
app.use(requestLogger)

// register route files
app.use('/items' ,itemRoutes)
app.use('/cart', cartRoutes)
app.use(userRoutes)


//////////////////////// STRIPE TESTING //////////
app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// app.post('/checkout/', async (req,res) => {
// 	console.log(req.body)

// 	let error, status

// 	try{
// 		const { product, token } = req.body
// 		const customer = await stripe.customers.create({
// 			email: token.email,
// 			source: token.id
// 		})

// 		const key = uuid()

// 		const charge = await stripe.charges.create({
// 			amount: product.price * 100,
// 			currency: "usd",
// 			customer: customer.id

// 		}, {
// 			key,
// 		}
// 		)

// 		console.log("-------- CHARGE -------", { charge })
// 		status = "success"

// 	} catch(error){
// 		console.log(error)
// 		status = "failure"


// 	}
// 	res.json({error, status})
// })


  
// Establisihing the checkout route, which is a post request for charges
app.post("/checkout/", (req, res) => {
	// Token is the stripeToken
	// item is the item or product we are asking them to add
	const { token, item } = req.body;
	const amount = item.price * 100; // convert price to cents
	const currency = "usd";
	// To charge a card we create a charge object
  
	stripe.charges
	  .create({
		amount,
		currency,
		source: token.id,
		description: item.description,
		shipping: {
		  name: token.card.name,
		  address: {
			line1: token.card.address_line1,
			line2: token.card.address_line2,
			city: token.card.address_city,
			country: token.card.country,
			postal_code: token.card.address_zip,
			state: token.card.address_state,
		  },
		},
	  })
	  // we console.log the charge and give a success msg
	  .then((charge) => {
		console.log("Charge:", charge);
		res.json({ success: true });
	  })
	  .catch((err) => {
		console.log("Error:", err);
		res.status(500).json({ error: err.message });
	  });
  });
  

//////////////////////////////////////////////////

// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler)

// run API on designated port (4741 in this case)
app.listen(port, () => {
	console.log('listening on port ' + port)
})






// needed for testing
module.exports = app

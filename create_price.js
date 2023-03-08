
require('dotenv').config()
const stripe = require('stripe')('sk_test_51MjOxGGWn0da1VDTUWK22U0AZYQIbKTMLHK38UwqwApO0HuX3BLgpi8yHcyKLf1sfYTpMlYdcX7tsA3jr6HHW5UY00hIPnYgZd');

stripe.products.create({
  name: 'Starter Subscription',
  description: '$12/Month subscription',
}).then(product => {
  stripe.prices.create({
    unit_amount: 1200,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your premium subscription price id: ' + price.id);
  });
});

// require('dotenv').config()

// const stripe = require('stripe')(process.env.STRIPE_API_KEY)


// stripe.products.create({
//   name: 'Starter Subscription',
//   description: '$12/Month subscription',
// }).then(product => {
//   stripe.prices.create({
//     unit_amount: 1200,
//     currency: 'usd',
//     recurring: {
//       interval: 'month',
//     },
//     product: product.id,
//   }).then(price => {
//     console.log('Success! Here is your starter subscription product id: ' + product.id);
//     console.log('Success! Here is your premium subscription price id: ' + price.id);
//   });
// });

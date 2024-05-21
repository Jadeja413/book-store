const express = require('express');
const Stripe = require('stripe');
const authenticate = require('../controller/authenticate');
const { cartLists, addToCart, deleteFromCart, removeItemFromCart } = require('../controller/cartlist');

const router = express.Router();
const stripe = Stripe('sk_test_51PGLfGSIADDoIVWIDEH2RoDxaaJJfEI1IIDN0eJ7d6G6QB8Fbi1nXD9z8GiYIH5S5RLdSc5cz9dDKjUBzRjEEKfe00nOVllc0N');

router.get('/', authenticate, cartLists);

router.post('/add', authenticate, addToCart);

router.post('/delete', authenticate, deleteFromCart);

router.post('/removeItem', authenticate, removeItemFromCart);

router.post('/payment', async (req, res) => {
  console.log('payment')
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      description: 'Book Payment',
      amount,
      currency: 'inr',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;

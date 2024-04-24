const express = require('express');
const  { wishLists, addToWishlist, removeFromWishlist}  = require('../controller/wishList');
const authenticate = require('../controller/authenticate');

const router = express.Router();

router.get('/', authenticate, wishLists);

router.post('/add', authenticate, addToWishlist);

router.get('/remove', authenticate, removeFromWishlist);

module.exports = router;

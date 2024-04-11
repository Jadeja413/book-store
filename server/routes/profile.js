const express = require('express');
const authenticate = require('../controller/authenticate');

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  res.json({ data: req.user, message: `Welcome ${req.user.name}` })
})

module.exports = router;

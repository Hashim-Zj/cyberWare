const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res
    .status(200)
    // .send('Hello frome server side!...')
    // .json({ message: 'Hello frome server side', app: 'cyberWare' });
    .render('index');
});

router.get('/signin', (req, res) => {
  res.send('hello signin');
});

module.exports = router;

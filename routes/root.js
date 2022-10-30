const express = require('express');
const router = express.Router();
const newUser = require('./../controllers/registerController');
const log = require('./../controllers/logController');
const refresh = require('./../controllers/authController');

router.get('/', (req, res) => {
  res
    .status(200)
    // .send('Hello frome server side!...')
    .json({ message: 'This is index page of cyberWare', app: 'cyberWare' });
  // .render('index');
});
router.use('/signup', newUser.newUser);
router.use('/re', refresh.handleRefreshToken);
router.use('/login', log.logIn);
router.use('/logout', log.logOut);

module.exports = router;

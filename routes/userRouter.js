const express = require('express');
const { newUser, logIn, logOut } = require('./../controllers/logsController');
const { isAuth } = require('./../middlewares/isAuth')

const router = express.Router();
// const refresh = require('./../controllers/authController');

router.route('/')
  .get((req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    res
      .status(200)
      // .send('Hello frome server side!...')
      // .json({ message: 'This is index page of cyberWare', app: 'cyberWare' });
      .render('index');
  });

router.route('/register')
  .get((req, res) => { res.status(200).json({ message: 'Register page is renders' }) })
  .post(newUser);

router.route('/logIn')
  .get((req, res) => {
    res
      .render('jk')
    // .status(200)
    // .json({ message: 'Login Page is renderd' })
  })
  .post(logIn);

router.route('/logOut')
  .get((req, res) => { res.status(200).json({ message: 'logOut Page is renderd' }) })
  .post(logOut);

router.route('/addToCart')
  .get(isAuth, (req, res) => {
    // console.log(req.session);
    const j = req.session;
    res.status(200).json({ message: 'addtocart Page is renderd', user: j, LKI: 'LKOO' })
  })

// router.use('/re', refresh.handleRefreshToken);
// router.use('/login', log.logIn);
// router.use('/logout', log.logOut);

module.exports = router;

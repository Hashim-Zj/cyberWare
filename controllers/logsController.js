const bcrypt = require('bcryptjs');
const User = require('./../models/userModel');
const { setAuth, isAuth } = require('./../middlewares/isAuth');

exports.newUser = async (req, res) => {
  const { firstName, lastName, email, phone, password, confirmPassword } =
    req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ errMessage: 'Please check your confirmPassword' });
  }

  const duplicateEmail = await User.findOne({ Email: email }).exec();
  if (duplicateEmail) {
    // console.log(duplicateEmail);
    return res
      .status(409)
      .json({ errMessage: 'The Email addrres is not available' }); // conflict
  }
  try {
    // Encript the password
    const encriptPassword = await bcrypt.hash(password, 11);
    // Create new user
    const result = await User.create({
      UserName: {
        FirstName: firstName,
        LastName: lastName,
      },
      Email: email,
      Phone: phone,
      Password: encriptPassword,
    });

    req.session.isAuth = true;
    req.session.user = result;
    req.cookies._id = result._id;
    // console.log(result); // print the result in console
    // console.log(req.session)
    res
      .status(201)
      .json({ success: `${email} created a new account`, user: result, });
  } catch (error) {
    res.status(500).json({ errMessage: error.message });
  } console.log(req.session);
};

exports.logIn = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res
      .status(400)
      .json({ message: 'EmailId and Password are required' });
  }
  // Check user is exist
  const existUser = await User.findOne({ Email: user }).exec();

  if (!existUser) return res.status(401).json({ errMessage: 'The user authentication not correct' }); // Unauthorized

  // Evaluate Password
  const checkPassword = await bcrypt.compare(password, existUser.Password);

  if (!checkPassword) return res.status(401).json({ errMessage: 'The user authentication not correct' }); // Unauthorized
  req.session.isAuth = true;
  req.session.user = existUser;
  req.cookies._id = existUser._id;
  res.status(201).json({ success: 'login success' })
};

exports.logOut = (req, res) => {
  req.session.destroy();
  res.redirect('/')
  // // req.session.destroy((err) => {
  // // if (err) throw err;
  // if (req.session.user && req.cookies._id) {
  //   console.log(req.cookies._id);
  //   res.clearCookie('_id')
  //   res.redirect('/')
  // }
  // else {
  //   console.log(req.cookies);
  //   res.status(404).json({ error: 'not cookew' })
  // }

  // })
}
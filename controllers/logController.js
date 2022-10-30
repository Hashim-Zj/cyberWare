const User = require('./../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logIn = async (req, res) => {
  const { emailId, Password } = req.body;
  if (!emailId || !Password) {
    return res
      .status(400)
      .json({ message: 'EmailId and Password are required' });
  }
  const findUser = await User.findOne({ emailId: emailId }).exec();
  if (!findUser) return res.sendStatus(401); // Unauthorized

  // Evaluate Password
  const equal = await bcrypt.compare(Password, findUser.Password);
  if (equal) {
    // Create JWTs
    const accessToken = jwt.sign(
      {
        userInfo: {
          emailId: findUser.emailId,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
      { emailId: findUser.emailId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    // Saving refreshtoken with current user
    findUser.refreshToken = refreshToken;
    const result = await findUser.save();
    console.log(result);

    res
      .cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        // secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

const logOut = async (req, res) => {
  // deleat the access token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // is refresh token in DB
  const findUser = await User.findOne({ refreshToken }).exec();
  if (!findUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204); // No content
  }

  // Delete refresh token in db
  findUser.refreshToken = '';
  const result = await findUser.save();
  console.log(result);
};

module.exports = { logIn, logOut };

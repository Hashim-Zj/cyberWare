const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const findUser = await User.findOne({ refreshToken }).exec();
  if (!findUser) return res.sendStatus(403); // Forbiden

  // JWT Evaluation
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || findUser.emailId !== decoded.emailId) return res.sendStatus(403);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          emailId: decoded.emailId,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };

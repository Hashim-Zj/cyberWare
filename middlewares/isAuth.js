
exports.isAuth = (req, res, next) => {
  console.log(req.session.isAuth);
  if (req.session.user)
    next();
  else {
    res
      .status(400)
      .json({ message: 'This page is not alloud' })
      .redirect('/login');
  }
};

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getToken = (user) => {
  return jwt.sign({
    _id: user._id,
    email: user.email
  },
  process.env.AUTH_TOKEN
  ,{
    expiresIn: '1d'
  });
};

const authToken =(req, res, next) => {
  console.log(req.headers);
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.AUTH_TOKEN, async (err, tokenCred) => {
    if (err) return res.sendStatus(403);
    try {
      const user = await User.findOne({
        _id: tokenCred._id,
      }).select("-password");
      req.user = user;
    } catch (error) {
      console.log(error.message);
    }

    next();
  });
};

module.exports = {
  authToken,
  getToken
};

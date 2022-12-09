const router = require('express').Router();
const { getToken } = require('../middlewares/jwt');
const { validateRoute } = require('../middlewares/validateRoute');
const User = require('../models/User');

router.post('/login', validateRoute(['email', 'password']), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.json({ success: false, message: 'No user with this email' });


    if(!await user.validatePassword(password)) {
     return res.json({
       success: false,
       message: "Wrong password!",
     });
    }

    const token = getToken(user);
    res.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.post('/register', validateRoute(['name', 'email', 'password']), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const dupEmail = await User.findOne({ email });
    if (dupEmail) return res.json({ success: false, message: "Email is already exist!", });

    const user = new User({ name, email, password });
    await user.save();
    const token = getToken(user);

    res.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;

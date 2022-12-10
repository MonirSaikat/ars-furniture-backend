const { validateRoute } = require('../middlewares/validateRoute');
const User = require('../models/User');
const router = require("express").Router();

router.get("/",  async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.findOneAndDelete(id);
    res.json({ success: true, message: 'User deleted successfully!' });
  } catch (error) {
    next(error);
  }
});

router.post("/", validateRoute(['name', 'email', 'password']), async (req, res,next) => {
  try {
    const data = req.body;
    const dupUser = await User.findOne({ email: data.email });
    if(dupUser) return res.json({ success: false, message: 'Email already exists!' });
    const user = new User(data);
    await user.save();
    res.json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

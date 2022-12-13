const Review = require('../models/Review');
const router = require('express').Router();
const { authToken } = require('../middlewares/jwt');
const { validateRoute } = require('../middlewares/validateRoute');
const { isAdmin } = require('../middlewares/acces');

router.get('/', authToken, isAdmin, async (req, res, next) => {
  try {
    const reviews = await Review.find().populate('user', '-password');
    res.json(reviews);
  } catch (error) {
    next(error);
  } 
});

router.get('/site', async (req, res, next) => {
  try {
    const reviews = await Review.find().populate('user', '-password');
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authToken, async(req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if(!review) throw new Error('No review found');

    if (review.ownBy(req.user) || req.user.isAdmin) {
      await review.delete();
      res.json({success: true, message: 'Review deleted successfully'});
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authToken, validateRoute(['text', 'rating']), async (req, res, next) => {
  try {
    const review = await Review.create({
      ...req.body,
      user: req.user._id
    });

    res.json(review);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

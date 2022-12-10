const Product = require('../models/Product');
const { validateRoute } = require('../middlewares/validateRoute');
const { isAdmin } = require('../middlewares/acces');
const { authToken } = require('../middlewares/jwt');
const router = require('express').Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndRemove(id);
    res.json({ success: true, id });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  authToken,
  isAdmin,
  validateRoute(["label", "price", "imageUrl", "rating"]),
  (req, res, next) => {
    const data = req.body;

    try {
      Product.create(data, (err, doc) => {
        if (err)
          res.json({
            success: false,
            message: err.message,
          });
        res.json(doc);
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

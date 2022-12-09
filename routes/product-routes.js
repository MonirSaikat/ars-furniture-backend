const Product = require('../models/Product');
const { validateRoute } = require('../middlewares/validateRoute');
const { isAdmin } = require('../middlewares/acces');
const { authToken } = require('../middlewares/jwt');
const router = require('express').Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndRemove(id);
    res.json({ success: true, id });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.post(
  "/",
  authToken,
  isAdmin,
  validateRoute(["label", "price", "imageUrl", "rating"]),
  (req, res) => {
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
      res.json({ success: false, message: error.message });
    }
  }
);

module.exports = router;

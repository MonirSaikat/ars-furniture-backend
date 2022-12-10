const { default: mongoose } = require('mongoose');
const { validateRoute } = require('../middlewares/validateRoute');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { isAdmin } = require('../middlewares/acces');

const router = require('express').Router();

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', '-password');
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.post('/', validateRoute(['discount', 'products']), async (req, res, next) => {
  try {
    const ids = [
      ...req.body.products.map((product) =>
        mongoose.Types.ObjectId(product)
      ),
    ];
    const products = await Product.find({
      '_id': {
        $in: ids
      }
    });

    // console.log(products);
    const total = products.reduce((prev, product) => {
      return prev + product.price;
    }, 0);

    const order = new Order({
      total, discount: req.body.discount, products: ids,
    });
    await order.save();
    res.json({
      success: true,
      order: {
        products,
        total,
      }
    })
  } catch (error) {
    next(error);
  }
});

router.put("/:id/complete", isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    order.status = 'completed';
    await order.save();
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/cancel", async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    order.status = "cancel";
    await order.save();
    res.json({ success: true, message: 'Order cancelled' });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    await order.delete();
    res.json({ success: true, message: 'Order deleted!' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

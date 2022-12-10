require('dotenv').config();
require('./db.js');
const express = require('express');
const cors = require('cors');
const { authToken } = require('./middlewares/jwt.js');
const { isAdmin } = require('./middlewares/acces.js');
const { errorHandler } = require('./middlewares/error.js');

const app = express();
app.use(cors());
app.use(express.json({ }));
app.use(express.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 5000);
app.use(express.static("public"));
app.use(errorHandler);

// ROUTES
app.use('/products', require('./routes/product-routes'));
app.use("/auth", require("./routes/auth-route"));
app.use("/reviews", require("./routes/review-route"));
app.use("/orders", authToken, require("./routes/order-routes"));
app.use(
  "/users",
  authToken,
  isAdmin,
  require("./routes/user-routes")
);

app.listen(app.get('port'), () => {
  console.log(`🔥🔥 Server running on PORT : ${app.get('port')}`);
});

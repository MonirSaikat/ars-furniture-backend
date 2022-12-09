require('dotenv').config();
require('./db.js');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ }));
app.use(express.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 5000);

// ROUTES
app.use('/products', require('./routes/product-routes'));

app.listen(app.get('port'), () => {
  console.log(`🔥🔥 Server running on PORT : ${app.get('port')}`);
});

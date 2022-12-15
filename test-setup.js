const mongoose = require('mongoose');

beforeAll(async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.DB_URL);
});


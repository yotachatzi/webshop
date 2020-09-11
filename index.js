const express = require('express');
const { connectDB, initDB } = require('./models/config');
const { UserSchema, PasswordSchema } = require('./models/Users');

const port = process.env.PORT || 5000;

const app = express();

const modelsInit = [UserSchema, PasswordSchema];

connectDB().then(async (result) => {
  // eslint-disable-next-line
  console.log(result.message);

  if (result.success) initDB(modelsInit);
});
// eslint-disable-next-line
app.listen(port, () => console.log(`🚀 Server is listening on port ${port}!`));

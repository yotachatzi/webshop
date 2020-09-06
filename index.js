const express = require('express');
const { client } = require('./config');

const port = process.env.PORT || 5000;

const app = express();

// eslint-disable-next-line
client.connect().then(() => console.log('Database successfully connected!'));

// eslint-disable-next-line
app.listen(port, () => console.log(`Server is listening on port ${port}`));

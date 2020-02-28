const express = require('express');
const app = express();

app.use(require('./beep'));

module.exports = app;
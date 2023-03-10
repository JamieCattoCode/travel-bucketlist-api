const express = require('express');
const userRouter = require('./routes/user');
const destinationRouter = require('./routes/destination');
const listRouter = require('./routes/list');
const favouriteRouter = require('./routes/favourite');

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/destinations', destinationRouter);
app.use('/lists', listRouter);
app.use('/favourites', favouriteRouter);

module.exports = app;
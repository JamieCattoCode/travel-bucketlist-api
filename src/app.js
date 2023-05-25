const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
const destinationRouter = require('./routes/destination');
const listRouter = require('./routes/list');
const favouriteRouter = require('./routes/favourite');
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        credentials: true
    })
);
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/destinations', destinationRouter);
app.use('/lists', listRouter);
app.use('/favourites', favouriteRouter);
app.use('/auth', authRouter);

module.exports = app;
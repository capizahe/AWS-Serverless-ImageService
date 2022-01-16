require('dotenv').config();

const express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var ImagesRouter = require('./Image/ImageRoute');

app.use('/image',ImagesRouter);

module.exports = app;
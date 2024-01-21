const express = require('express');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const AppError = require('./utils/appError.js');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const articleRouter = require('./routes/articleRoutes');
const commentRouter = require('./routes/commentRoutes');
const { default: helmet } = require('helmet');

const app = express();

app.use(
  cors({
    origin: 'https://65ad9ab9fe2cc0ba8d15a8e6--spiffy-nougat-9519f9.netlify.app',
    credentials: true,
  }),
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!',
// });
//
// app.use('/api', limiter);

app.use(mongoSanitize());

app.use(
  express.json({
    limit: '10kb',
  }),
);

// ROUTES
app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);
app.use('/api/articles', articleRouter);

app.all('*', function (req, _, next) {
  next(new AppError(`Can't find ${req.url} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;


const AppError = require('../utils/appError.js');

const sendErrorDev = (err, req, res) => {
  if (req.url.startsWith('/api')) {
    console.log('ERROR 🔥', err);
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  if (req.url.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    console.error('ERROR 🔥', err);
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error('ERROR 🔥', err);

  return res.status(500).json({
    title: 'Something went wrong',
    message: 'Please try again later',
  });
};

const handleDuplicateFieldsDB = (err) => {
  const value = Object.keys(err.keyValue);
  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    sendErrorProd(err, req, res);
  }
  next();
};
module.exports = globalErrorHandler;


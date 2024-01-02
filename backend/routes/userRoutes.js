const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);

userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);

userRouter.use(authController.protect);

userRouter.patch('/updateMyPassword', authController.updatePassword);
userRouter.patch(
  '/',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateUserPhoto,
);
userRouter.patch('/me', userController.updateUserSettings);
module.exports = userRouter;


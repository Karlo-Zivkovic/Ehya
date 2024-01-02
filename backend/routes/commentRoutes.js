const express = require('express');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');

const commentRouter = express.Router();

commentRouter.use(authController.protect);

commentRouter.route('/').post(commentController.createComment)
commentRouter.route('/:slug').get(commentController.getAllComments);
commentRouter.route('/:_id').delete(commentController.deleteComment).put(commentController.editComment)


module.exports = commentRouter;

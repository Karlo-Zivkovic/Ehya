const express = require('express');
const authController = require('../controllers/authController');
const articleController = require('../controllers/articleController');

const articleRouter = express.Router();

articleRouter
  .route('/')
  .get(articleController.getAllArticles)
  .post(
    authController.protect,
    articleController.uploadArticlePhoto,
    articleController.resizeArticlePhoto,
    articleController.createArticle,
  );

articleRouter
  .route('/myArticles')
  .get(authController.protect, articleController.getMyArticles);

articleRouter
  .route('/:slug')
  .get(authController.protect, articleController.getArticle);

module.exports = articleRouter;


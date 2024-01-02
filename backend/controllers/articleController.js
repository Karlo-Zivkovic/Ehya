const catchAsync = require('../utils/catchAsync');
const sharp = require('sharp');
const Article = require('../models/articleModel.js');
const APIFeatures = require('../utils/apiFeatures.js');
const upload = require('../utils/multer.js');

exports.getAllArticles = catchAsync(async (req, res) => {
  const totalCount = await Article.getTotalCount();
  const features = new APIFeatures(Article.find(), req.query)
    .filter()
    .paginate();

  const data = await features.query
    .populate([
      {
        path: 'user',
        select: ['name', 'photo'],
      },
    ])
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: data.length,
    totalCount,
    data,
  });
});

exports.uploadArticlePhoto = upload.single('photo');
exports.resizeArticlePhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(700, 700)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/articles/${req.file.filename}`);

  next();
};

exports.getArticle = catchAsync(async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  res.status(200).json({
    status: 'success',
    data: article,
  });
});

exports.createArticle = catchAsync(async (req, res) => {
  const articleData = req.body;
  articleData.photo = req.file.filename;

  const article = await Article.create(articleData);

  res.status(201).json({
    status: 'success',
    data: {
      data: article,
    },
  });
});

exports.getMyArticles = catchAsync(async (req, res) => {
  const articles = await Article.find({ user: req.user._id })
    .populate([
      {
        path: 'user',
        select: ['name', 'photo'],
      },
    ])
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    data: articles,
  });
});


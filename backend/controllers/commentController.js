const Article = require('../models/articleModel');
const Comment = require('../models/commentModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createComment = catchAsync(async (req, res, next) => {
  const { slug, desc, parent } = req.body;
  const article = await Article.findOne({ slug });

  if (!article) {
    return next(new AppError('Article was not found', 404));
  }

  const comment = await Comment.create({
    article: article._id,
    user: req.user._id,
    desc,
    parent,
  });

  res.status(201).json({
    status: 'success',
    data: comment,
  });
});

exports.getAllComments = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const article = await Article.findOne({ slug });

  if (!article) {
    return next(new AppError('Article was not found', 404));
  }

  const data = await Comment.find({ article: article._id }).populate([
    {
      path: 'user',
      select: ['name', 'photo'],
    },
    {
      path: 'parent',
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: data,
    data,
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  await Comment.findByIdAndDelete(_id);
  await Comment.deleteMany({ parent: _id });

  res.status(200).json({
    status: 'success',
  });
});

exports.editComment = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const comment = await Comment.findOne({ _id });

  if (!comment) {
    return next(new AppError('Article was not found', 404));
  }

  req.body.updatedAt = new Date();

  const updatedComment = await Comment.findByIdAndUpdate(
    { _id },
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: 'success',
    data: updatedComment,
  });
});

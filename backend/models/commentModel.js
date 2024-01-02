const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    desc: { type: String, required: true },
    article: { type: mongoose.Schema.ObjectId, ref: 'Article', required: true },
    parent: {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
      default: null,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

commentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
});

commentSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

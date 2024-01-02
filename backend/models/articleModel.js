const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    caption: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: [true, 'Please provide a unique title'],
    },
    photo: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Article must belong to a user'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

articleSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

articleSchema.statics.getTotalCount = async () => {
  const count = await Article.countDocuments();
  return count;
};

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;


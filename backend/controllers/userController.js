const sharp = require('sharp');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const upload = require('../utils/multer');

exports.uploadUserPhoto = upload.single('file');
exports.resizeUserPhoto = (req, _, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`; // putting it to jpeg because toFormat("jpeg")
  sharp(req.file.buffer)
    .resize(700, 700)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/users/${req.file.filename}`);

  next();
};

exports.updateUserPhoto = catchAsync(async (req, res) => {
  const data = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { photo: req.file.filename } },
    { new: true },
  );

  res.status(200).json({
    status: 'success',
    data,
  });
});

exports.updateUserSettings = catchAsync(async (req, res) => {
  const data = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { name: req.body.name, email: req.body.email } },
    { new: true },
  );

  res.status(200).json({
    status: 'success',
    data,
  });
});



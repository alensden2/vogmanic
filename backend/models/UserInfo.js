const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  primaryAddress: {
    type: String,
    required: true,
  },
  secondaryAddress: {
    type: String,
  },
  otherAddresses: [String],
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = UserInfo;

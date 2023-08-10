const mongoose = require('mongoose');

// Defining the user information schema
const userInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',        // Referencing the User model
    required: true,     // User ID is a required field
    unique: true,       // Ensuring that the user ID is unique
  },
  username: {
    type: String,
    required: true,     // Username is a required field
  },
  bio: {
    type: String,
    required: false,    // Bio is an optional field for user profile
  },
  email: {
    type: String,
    required: true,     // Email is a required field for communication
  },
  primaryAddress: {
    type: String,
    required: false,    // Primary address is optional for shipping
  },
  secondaryAddress: {
    type: String,       // Secondary address is optional
  },
  otherAddresses: [String],     // Array of other optional addresses
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = UserInfo;

const mongoose = require('mongoose');

// Defining the schema for a user in the application.
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,  // Email is a required field for identification
    unique: true,    // Ensuring that the email is unique across all users
  },
  password: {
    type: String,
    required: true,  // Password is required for authentication
  },
  birthdate: {
    type: Date,
    required: true,  // Birthdate is required, possibly for age verification or personalization
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

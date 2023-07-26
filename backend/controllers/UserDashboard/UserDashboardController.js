const UserInfo = require('../../models/UserInfo');

// Controller function to fetch user information
exports.getUserInfo = async (req, res) => {
  try {
    // Retrieve user information based on the user ID (assuming you have implemented user authentication)
    const userInfo = await UserInfo.findOne({ userId: req.userId });

    if (!userInfo) {
      return res.status(404).json({ error: 'User information not found' });
    }

    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to update user information
exports.updateUserInfo = async (req, res) => {
  try {
    // Retrieve user information based on the user ID (assuming you have implemented user authentication)
    let userInfo = await UserInfo.findOne({ userId: req.userId });

    if (!userInfo) {
      // If user info doesn't exist, create a new entry for the user
      userInfo = new UserInfo({ userId: req.userId });
    }

    // Update the user information based on the fields received in the request body
    userInfo.username = req.body.username;
    userInfo.bio = req.body.bio;
    userInfo.email = req.body.email;
    userInfo.primaryAddress = req.body.primaryAddress;
    userInfo.secondaryAddress = req.body.secondaryAddress;
    userInfo.otherAddresses = req.body.otherAddresses;

    // Save the updated user information
    await userInfo.save();

    res.status(200).json({ message: 'User information updated successfully', userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

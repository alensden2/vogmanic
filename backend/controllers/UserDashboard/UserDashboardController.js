const UserInfo = require('../../models/UserInfo');

/**
 * Get User Information
 * 
 * This function retrieves user information based on the user ID.
 *
 * @param {request} req - The request object (assumes user authentication is implemented).
 * @param {response} res - The response object to send the retrieved user information.
 */
const getUserInfo = async (req, res) => {
  try {
    const userInfo = await UserInfo.findOne({ userId: req.userId });

    if (!userInfo) {
      return res.status(404).json({ error: 'User information not found' });
    }

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Update User Information
 * 
 * This function updates user information based on the user ID and provided input fields.
 * If user information does not exist, it creates a new entry for the user.
 *
 * @param {request} req - The request object containing user information such as username, bio, email, and addresses (assumes user authentication is implemented).
 * @param {response} res - The response object to send the update status.
 */
const updateUserInfo = async (req, res) => {
  try {
    let userInfo = await UserInfo.findOne({ userId: req.userId });

    if (!userInfo) {
      userInfo = new UserInfo({ userId: req.userId });
    }

    userInfo.username = req.body.username;
    userInfo.bio = req.body.bio;
    userInfo.email = req.body.email;
    userInfo.primaryAddress = req.body.primaryAddress;
    userInfo.secondaryAddress = req.body.secondaryAddress;
    userInfo.otherAddresses = req.body.otherAddresses;

    await userInfo.save();

    res.status(200).json({ message: 'User information updated successfully', userInfo });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getUserInfo,
  updateUserInfo,
};
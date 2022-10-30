const User = require('./../models/userModel');
const bcrypt = require('bcrypt');

const newUser = async (req, res) => {
  const { userName, emailId, phoneNo, Password } = req.body;
  if (!userName || !emailId || !phoneNo || !Password) {
    return res
      .status(400)
      .json({ message: 'UserName, Password and EmailId are requierd' });
  }
  // Check for duplocate users
  const duplicate = await User.findOne({ emailId: emailId }).exec();
  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    // Encrypt the Password
    const hashedPassword = await bcrypt.hash(Password, 12);

    // Create New User
    const result = await User.create({
      userName: userName,
      emailId: emailId,
      phoneNo: phoneNo,
      Password: hashedPassword,
    });
    console.log(result);

    res.status(201).json({ Success: `New user ${emailId} Creared` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { newUser };

const bcrypt = require("bcrypt");
const User = require("../models/User");

require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { username, name, surname, phone, password, email } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "The Username or e-mail is Already in Use!" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      surname,
      phone,
      password: hashedPassword,
      email,
    });

    await user.save();
    res.status(201).json({ message: "User Register Success!", user });
  } catch (error) {
    res.status(500).json({ message: "Fail! User Register", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password Incorrect!" });
    }

    res.status(200).json({ message: "Login Success!", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in!", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findOneAndDelete({ userId });
    if (!deletedUser) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    res
      .status(200)
      .json({ message: "User Successfully Deleted!", deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting User!", error });
  }
};

exports.updateNickName = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { username },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    res
      .status(200)
      .json({ message: "Username Successfully Updated!", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error Updating Username!", error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Users Successfully Brought In!", users });
  } catch (error) {
    res.status(500).json({ message: "Error Retrieving Users!", error });
  }
};

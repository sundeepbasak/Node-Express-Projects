const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

const getAllUsers = async (req, res) => {
  //cosole.log(req.user); //passed from authenticateUser

  //get all users whose role is 'user' and remove password property
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  //   console.log(req.params.id);
  //get user by id and remove password property
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(
      `No user with id: ${req.params.id} exist`
    );
  }

  //check for permissions if current user is able to access other's detail
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

//**update user with user.save()
const updateUser = async (req, res) => {
  // console.log(req.body);
  // console.log(req.user);
  const { name, email } = req.body;
  const { userId } = req.user;

  //check if name and email exist in req.body
  if (!name || !email) {
    throw new CustomError.BadRequestError("Please provide both values");
  }

  //look for user and update
  const user = await User.findOne({ _id: userId });
  user.name = name;
  user.email = email;
  await user.save(); //invokes .pre('save') in user.model.js

  //create token user, attachCookiesToResponse and send back the tokenUser
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

//**update user password
const updateUserPassword = async (req, res) => {
  // console.log(req.body);
  // console.log(req.user);
  const { oldPassword, newPassword } = req.body;
  const { userId } = req.user;

  //check if oldPassword and newPassword exist in req.body
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }

  //look for user in db
  const user = await User.findOne({ _id: userId });
  //check if oldPassword matches with password
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  //if all good, update user.password with the newPassword
  user.password = newPassword;
  await user.save(); //invokes .pre('save') in user.model.js, which hashes the password
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};

//.select('-password') --> is used to remove password property

/* //** update user with findOneAndUpdate
//**with findOneAndUpdate --> we didn't trigger the .pre('save) fn

const updateUser = async (req, res) => {
  // console.log(req.body);
  // console.log(req.user);
  const { name, email } = req.body;
  const { userId } = req.user;

  //check if name and email exist in req.body
  if (!name || !email) {
    throw new CustomError.BadRequestError("Please provide both values");
  }

  //look for user and update
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { name: name, email: email },
    { new: true, runValidators: true }
  );

  //create token user, attachCookiesToResponse and send back the tokenUser
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
*/

const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors"); //or '../errors/index'
const { attachCookiesToResponse, createTokenUser } = require("../utils"); //or '../utils/index'

//register user
const register = async (req, res) => {
  //console.log(req.body);
  const { name, email, password } = req.body;

  //check if email exists
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    throw new CustomError.BadRequestError("Email already exist");
  }

  //first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  //create a user
  const user = await User.create({ name, email, password, role });
  const tokenUser = createTokenUser(user);
  //create and verify token --> in jwt.js
  //setting up cookies --> sending token(jwt) as a cookie instead of directly sending in response
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

//login user
const login = async (req, res) => {
  const { email, password } = req.body;
  //check if email and password exist in req
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  //find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  //check password match
  const isPasswordCorrect = user.comparePassword(password); //returns true or false from model
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  //if everything correct, create token and attach it to cookies
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

//logout user
const logout = async (req, res) => {
  res.cookie("token", "randomstring", {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 1000), //remove in 5s
  });
  res.status(StatusCodes.OK).json({ msg: "successfully logged out" });
};

module.exports = {
  register,
  login,
  logout,
};



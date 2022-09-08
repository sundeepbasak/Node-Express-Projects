const User = require("../models/user.model"); //importing user model
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index"); //or just ('../errors') --> by default it takes the index

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  // console.log(token);
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //if email and password exist --> find user in db by email and compare pwd, else throw badreq error
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  //if user exists and pwd is correct --> create JWT, else throw unauth error
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  //compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};

/* //**to hash a password:
--> generate salt: which are random bytes
--> and then pass password and salt to the .hash() method
thus, we get a hashed password

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);

  const tempUser = { name, email, password: hashedPassword };
  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json({ user });
}
*/

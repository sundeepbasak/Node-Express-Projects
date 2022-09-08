const CustomError = require("../errors");
const { isTokenValid } = require("../utils/jwt");

//authenticate user
const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  //if token is valid
  try {
    const payload = isTokenValid({ token });
    // console.log(payload);
    const { name, role, userId } = payload;
    req.user = { userId, name, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

//authorize permissions based on role
const authorizePermissions = (...roles) => {
  //console.log(roles);
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next(); //if role is admin, pass to the next middleware
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};

/* we are using signedCookies, instead of normal cookies,
--> thus token is present in req.signedCookies.token
--> here token is the name we provided, it can be any name

res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true
  });
*/

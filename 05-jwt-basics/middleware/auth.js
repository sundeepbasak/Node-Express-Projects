const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  //if authHeader doesnt exist or if authHeader doesnt start with Bearer --> then throw error
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }

  const token = authHeader.split(" ")[1]; //Bearer <token>
  //console.log(token);

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

module.exports = authMiddleware;

//inorder to move to the next middleware, next func is reqd

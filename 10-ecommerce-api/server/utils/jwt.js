const jwt = require("jsonwebtoken");

//create token
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  // console.log(token);
  return token;
};

//verify token
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

//setting up cookies --> sending token(jwt) as a cookie instead of directly sending in response
const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24; //in milliseconds
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};

/* secure: process.env.NODE_ENV === 'production'
--> in production --> secure: true
--> in development --> secure: false

thus, in production, cookies will be sent on https
*/
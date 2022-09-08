//check username, password in post(login) request
//if user, exist create new JWT
//send back to front-end(dashboard)
//setup authentication so only the request with JWT can access the dashboard

const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors/index");

//setup authentication so only the request with JWT can access the dashboard
//only those users are given access to dasboard which have a JWT in their request( which is obtained only when the user is loggedin successfully)

const login = async (req, res) => {
  const { username, password } = req.body;
  //   console.log(username, password);

  //check by mongoose validation /joi npm validation/controller validation
  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  //try to keep payload small,better experience for user
  //.sign() takes 3 things --> payload, jwtsecretkey and options
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  //console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};

/* we will have 2 routes: public and restricted
- public routes are accessible to everyone
- restricted routes are accessible only by correct signed JWT
*/

/* 
client --> login request         --> server
       <-- response + signed JWT <-- 

client --> request + signed JWT --> server
       <-- response             <--
*/

//JWT is just a way to exchange data(in a secure way) between two parties — a client and a server.
//It can be used as an access token to prevent unwanted access to a protected resource. They are often used as Bearer tokens, which the API will decide and validate before sending a response.
//JWT consists of 3 parts: Header, Payload, Signature

//console.log(decoded) -->
//looks like this: { id: 17, username: 'sundeep', iat: 1660675640, exp: 1663267640 }

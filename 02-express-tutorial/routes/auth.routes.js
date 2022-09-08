const express = require("express");
const router = express.Router();

//**base url provided: /login

//POST - /login - index.html form data
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(401).send("Please provide the credentials");
  }
  res.status(200).send(`Welcome ${name}`);
});

module.exports = router;

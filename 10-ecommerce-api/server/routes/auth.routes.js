const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/auth.controller");

//baseURL: /api/v1/auth
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;

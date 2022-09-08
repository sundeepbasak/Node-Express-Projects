const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main.controller"); //import controller func's
const authMiddleware = require("../middleware/auth"); //importing middleware

//base url: /api/v1
router.get("/dashboard", authMiddleware, dashboard);
router.post("/login", login);

module.exports = router;

//route by chaining 
//router.route('/dashboard').get(authMiddleware, dashboard)

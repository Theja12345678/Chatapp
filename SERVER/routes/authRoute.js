const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController=require("../controller/authController")
const auth=require("../middleware/authMiddleware")
// Register a new user
router.post('/register',userController.register )
    router.post('/login',auth,userController.login)
  
  module.exports = router;
  
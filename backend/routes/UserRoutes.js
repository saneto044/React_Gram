const express = require('express');
const router = express.Router();

//controller
const {  register,login,getCurrentUser,update,getUserById } = require('../controllers/UserController');

//Middlewares
const validate = require("../middlewares/handleValidator");
const { userCreateValidation,loginValidation, userUpdateValidation } = require('../middlewares/useValidator');
const authGuard  = require("../middlewares/authGuard");
const {imageUpload} = require('../middlewares/imageUpload');

//Routes
router.post("/register",userCreateValidation(), validate,register);
router.get("/profile",authGuard, getCurrentUser);
router.post("/login",loginValidation(),login);
router.put("/",authGuard, userUpdateValidation(), validate, imageUpload.single('profileImage') ,update)
router.get("/:id", getUserById);

module.exports = router
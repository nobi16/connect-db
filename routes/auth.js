var express = require("express");
var router = express.Router();
const { body } = require('express-validator');
const { signout, signup, signin, updateUser } = require("../controllers/userController/auth");
const { isSignedIn } = require("../middleware/authMiddleware");

router.post("/signup",
    // body('name').isLength({ min: 5 }).withMessage('name required & must be at least 5 chars long'),
    // body('userName').isLength({ min: 5 }).withMessage('username required & must be at least 5 chars long'),
    // body('password').isLength({ min: 5 }).withMessage('password required & must be at least 5 chars long'),
    signup);

router.post("/signin",
    // body('userName').isLength({ min: 5 }).withMessage('Enter valid username'),
    // body('password').isLength({ min: 5 }).withMessage('Enter valid password'),
    signin);

router.post("/updateuser",
    // body('name').isLength({ min: 5 }).withMessage('name required & must be at least 5 chars long'),
    // body('userName').isLength({ min: 5 }).withMessage('username required & must be at least 5 chars long'),
    // body('password').isLength({ min: 5 }).withMessage('password required & must be at least 5 chars long'),
    isSignedIn ,updateUser);

router.get("/signout", signout);


module.exports = router;

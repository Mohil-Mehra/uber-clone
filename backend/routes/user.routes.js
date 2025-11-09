const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controllers');
const { authenticate } = require('../middlewares/auth.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/signup', [
  body("fullname.firstname").not().isEmpty().withMessage('firstname is required'),
 
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], userController.signup );


router.post('/login' , [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], userController.login );


router.get('/profile', authMiddleware.authUser  , userController.getProfile );

router.get('/logout', authMiddleware.authUser, userController.logoutUser )


   


module.exports = router;
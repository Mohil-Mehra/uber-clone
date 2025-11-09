const express = require('express')
const router = express.Router()
const { body }=require('express-validator')
const captainController=require('../controllers/captain.controller') 
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('fullname.firstname').isString().isLength({ min: 3 }).withMessage('Firstname must have at least 3 characters'),
    
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must have at least 3 characters'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must have at least 3 characters'),
    body('vehicle.capacity').isInt().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type')
], captainController.createCaptain);

router.post('/login', [ body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must have at least 6 characters')
], captainController.loginCaptain);


router.get('/profile', authMiddleware.authcaptain, captainController.getCaptainProfile);


router.get('/logout', authMiddleware.authcaptain, captainController.logoutCaptain);

module.exports = router;
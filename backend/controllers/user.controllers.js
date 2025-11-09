const Usermodel = require('../models/user.model');
const userService = require('../services/user.services');
const {validationResult} = require('express-validator');
const blacklistToken =  require('../models/blacklistToken.model')


module.exports.signup = async (req, res , next) => {
 
    const errors = validationResult(req);

    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname, email, password} = req.body;
    const isUserAlreadyExists = await Usermodel.findOne({ email });
    if (isUserAlreadyExists) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const passwordHash = await Usermodel.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname , lastname:fullname.lastname  , email, password: passwordHash 
    });

    const token = user.generateAuthToken();
     return res.status(201).json({ user, token });
}

module.exports.login = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const user = await Usermodel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    res.cookie('token', token); 
    return res.status(200).json({ user, token });
    
}   

module.exports.getProfile = async (req, res, next) => {
    res.status(200).json({ user: req.user });
    

}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.header('Authorization')?.replace('bearer ', '');
    await blacklistToken.create({ token });
    
    return res.status(200).json({ message: 'Logged out successfully' });
}
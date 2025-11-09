const captainModel = require('../models/captain.model')
const captainService = require('../services/captain.services')
const {validationResult} = require('express-validator')
const BlacklistToken = require('../models/blacklistToken.model')
const bcrypt = require('bcrypt')




module.exports.createCaptain = async (req, res , next ) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname, email, password, vehicle} = req.body;

    const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
        return res.status(400).json({ error: 'Captain already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        }
    });

    const token = captain.generateAuthToken();
    res.status(201).json({token, captain });


}; 

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token);
    return res.status(200).json({ token , captain });
};

module.exports.getCaptainProfile = async (req, res , next) => {
    const captain = req.captain;
    res.status(200).json({ captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
    try {
    // 1️⃣ Extract token BEFORE clearing cookie
    const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // 2️⃣ Blacklist token
    await BlacklistToken.create({ token });

    // 3️⃣ Clear cookie AFTER saving token
    res.clearCookie('token');

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


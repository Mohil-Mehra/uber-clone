const usermodel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken.model'); // Capital B
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const isBlacklisted = await BlacklistToken.findOne({ token }); // ✅ Fixed name

    if (isBlacklisted) {
        return res.status(401).json({ error: 'Unauthorized (blacklisted token)' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        const user = await usermodel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.user = user;    
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' });
    }   
}

module.exports.authcaptain = async (req, res, next) => {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const isBlacklisted = await BlacklistToken.findOne({ token });

    if (isBlacklisted) {
        return res.status(401).json({ error: 'Unauthorized (blacklisted token)' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded.id);
        if (!captain) {
            return res.status(404).json({ error: 'Captain not found' });
        }
        req.captain = captain;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {  firstname: {type:String, required: true , minlegth: 3},
    lastname: {type: String,  minlegth: 3} }, 
    email: { type: String, required: true,},
    socketid: { type: String, },
    password: { type: String, required: true, select: false, }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function(password)   {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const Usermodel = mongoose.model('User', userSchema);
module.exports = Usermodel;
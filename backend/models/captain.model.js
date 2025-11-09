const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'Firstname must have at least 3 characters'],
    },
    lastname: {
      type: String,
      minlength: [3, 'Lastname must have at least 3 characters'],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true, // 👈 prevent duplicate emails
    match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
  },
  socketid: { type: String },
  password: { type: String, required: true, select: false },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, 'Color must have at least 3 characters'],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, 'Plate must have at least 3 characters'],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, 'Capacity must be at least 1'],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ['car', 'bike', 'auto'],
    },
  },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
});

// ✅ Generate JWT with `id` (not _id) to match middleware
captainSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, role: 'captain' }, // 👈 fix here
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// ✅ Compare password
captainSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// ✅ Static method to hash password
captainSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

const captainModel = mongoose.model('Captain', captainSchema);
module.exports = captainModel;

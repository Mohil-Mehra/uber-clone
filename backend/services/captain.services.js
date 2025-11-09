// captain.services.js
const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({ firstname, lastname, email, password, vehicle }) => {
  if (!firstname || !lastname || !email || !password || !vehicle) {
    throw new Error("All fields are required");
  }

  const { color, plate, capacity, vehicleType } = vehicle;
  if (!color || !plate || !capacity || !vehicleType) {
    throw new Error("All vehicle fields are required");
  }

  const captain = await captainModel.create({
    fullname: { firstname, lastname },
    email,
    password,
    vehicle: { color, plate, capacity, vehicleType }
  });

  return captain;
};

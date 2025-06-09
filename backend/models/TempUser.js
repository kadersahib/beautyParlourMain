const mongoose = require('mongoose');

const TempUserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    otp: String,
    createdAt: { type: Date, default: Date.now, expires: 300 } // auto delete after 5 min
});

module.exports = mongoose.model('TempUser', TempUserSchema);

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        require: true,
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true,
        require: true
    },
    salt: String,
    hash: String,
    courses: { type: mongoose.Schema.Types.Array, ref: "Course" }
}, { timestamp: true });


const User = mongoose.model('User', UserSchema);

module.exports = User;

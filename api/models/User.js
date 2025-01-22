const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const UserChema = new Schema({
    username: {
        type: String,
        required: true,
        min:2,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

const UserModel = model('User', UserChema);

module.exports = UserModel;

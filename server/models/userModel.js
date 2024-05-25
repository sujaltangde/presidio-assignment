const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({


    firstName: {
        type: String,
        required: [true, "Please enter your first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"]
    },

    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, "Please Enter valid email address"],
    },

    phoneNumber: {
        type: String,
        unique: true,
        required: [true, "Please enter a phone number"],
    },

    password: {
        type: String,
        required: [true, "Please enter a password"]
    },


    role:{
        type: String,
        required: true,
        enum: ["seller", "buyer"],
        default: "buyer"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

const User = mongoose.model('User', UserSchema)
module.exports = User
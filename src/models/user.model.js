const mongoose = require("mongoose")

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    reset: {
       code: {
        type: String,
        default: null
       } ,
       time: {
        type: String,
        default: null
       }
    }
},{collection: "users", timestamps: true})

const user = mongoose.model("users", userShema)

module.exports = user
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    coverPic : {
        type : String,
        default : "",
    },
    profilePic : {
        type : String,
        default : "",
    },
    city : {
        type : String,
        default : "City",
    },
    website : {
        type : String,
        default : "Website",
    }
},{timestamps : true})

module.exports = mongoose.model('User', UserSchema)
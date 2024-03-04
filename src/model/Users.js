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
    // website : {
    //     // type : String,
    //     // default : "Website",

    // },
    facebook : {
        type : String,
        default : "https://facebook.com"
    },
    Instagram : {
        type : String,
        default : "https://www.instagram.com"
    },
    Twitter : {
        type : String,
        default : "https://twitter.com"
    },
    LinkedIn : {
        type : String,
        default : "https://in.linkedin.com"
    },
    Printrest : {
        type : String,
        default : "https://in.pinterest.com"
    },
    language : {
        type : String,
        default : "English",
    }
},{timestamps : true})

module.exports = mongoose.model('User', UserSchema)
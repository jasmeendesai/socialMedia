const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const RelationSchema = new mongoose.Schema({
    followerUserId : {
        type : ObjectId,
        ref : "User",
        required : true
    },
    followedUserId : {
        type : ObjectId,
        ref : "User",
        required : true
    },
    
}, {timestamps : true})

module.exports = mongoose.model('Relations', RelationSchema)
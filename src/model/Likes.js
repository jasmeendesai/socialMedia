const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const LikeSchema = new mongoose.Schema({
    likeUserId : {
        type : ObjectId,
        ref : "User",
        required : true
    },
    likePostId : {
        type : ObjectId,
        ref : "Post",
        required : true
    },
    
}, {timestamps : true})

module.exports = mongoose.model('Likes', LikeSchema)
const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const CommentSchema = new mongoose.Schema({
    userId : {
        type : ObjectId,
        ref : "User",
        required : true
    },
    postId : {
        type : ObjectId,
        ref : "Post",
        required : true
    },
    desc : {
        type : String,
        max : 500,
    },
    
}, {timestamps : true})

module.exports = mongoose.model('Comment', CommentSchema)
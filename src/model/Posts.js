const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const PostSchema = new mongoose.Schema({
    userId : {
        type : ObjectId,
        ref : "User",
        required : true
    },
    desc : {
        type : String,
        max : 500,
    },
    img : String,
    
}, {timestamps : true})

module.exports = mongoose.model('Post', PostSchema)
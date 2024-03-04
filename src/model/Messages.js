const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const MessageSchema = new mongoose.Schema({
    conversationId : {
        type : ObjectId,
        ref : "Conversations"
    },
    sender : {
        type : String,
    },
    text : {
        type : String,
    },
      
}, {timestamps : true})

module.exports = mongoose.model('Messages', MessageSchema)
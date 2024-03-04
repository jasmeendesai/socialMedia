const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const ConversationSchema = new mongoose.Schema({
    // members : {
    //     type : Array,
    // },
    members : {
        type : [ObjectId],
        ref : "User"
    },
    
}, {timestamps : true})

module.exports = mongoose.model('Conversations', ConversationSchema)
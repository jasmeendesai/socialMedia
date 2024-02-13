const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const StoriesSchema = new mongoose.Schema({
    userId : {
        type : ObjectId,
        ref : "User",
        required : true
    },
    img : String,
    
}, {timestamps : true})

module.exports = mongoose.model('Stories', StoriesSchema)
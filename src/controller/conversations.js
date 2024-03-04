
const Conversation = require('../model/Conversations')

const addConversations = async (req, res) => {
    try {
        const {senderId, receiverId} = req.body;

        const newConversation = await Conversation.create({
            members : [senderId, receiverId]
        })
        return res.status(201).send(newConversation)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getConversations = async (req, res) => {
    try {
        const {userId} = req.params
        const conversation = await Conversation.find({
            members : {$in : [userId]}
        }).populate({
            path: 'members',
            select: 'name profilePic',
        })
        return res.status(200).send(conversation)
    } catch (error) {
        return res.status(500).json(error)
    }
}


module.exports = {getConversations, addConversations}
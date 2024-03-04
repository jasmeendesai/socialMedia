const Message = require("../model/Messages")
const addMessages = async (req, res) => {
    try {

        const newMessage = await Message.create(req.body)

        return res.status(201).send(newMessage)

    } catch (error) {
        return res.status(500).json(error)
    }
}

const getMessages = async (req, res) => {
  try {
        const {conversationId} = req.params
        const message = await Message.find({conversationId : conversationId})

        return res.status(201).send(message)
        
    } catch (error) {
        return res.status(500).json(error)
    }
}


module.exports = {getMessages, addMessages}
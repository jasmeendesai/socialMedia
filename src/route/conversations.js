const express = require('express')

const  {getConversations, addConversations} = require('../controller/conversations')

const router = express.Router()

router.get("/:userId", getConversations)
router.post("/", addConversations)

module.exports = router
const express = require('express')

const {getMessages, addMessages} = require('../controller/messages')

const router = express.Router()

router.get("/:conversationId", getMessages)
router.post("/", addMessages)

module.exports = router
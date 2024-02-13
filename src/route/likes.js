const express = require('express')

const {getLikes, addLikes, deleteLikes} = require('../controller/like')
const { Authentication } = require('../middleware/auth')

const router = express.Router()

router.get("/", getLikes)
router.post("/", Authentication ,addLikes)
router.delete("/", Authentication, deleteLikes)


module.exports = router
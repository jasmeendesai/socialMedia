const express = require('express')

const {getComments, addComments} = require('../controller/comment')
const { Authentication } = require('../middleware/auth')

const router = express.Router()

router.get("/", getComments)
router.post("/", Authentication, addComments)

module.exports = router
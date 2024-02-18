const express = require('express')

const {getStories, addStories, deleteStories} = require('../controller/story')
const { Authentication, Authorisation } = require('../middleware/auth')

const router = express.Router()

router.get("/", Authentication, getStories)
router.post("/", Authentication, Authorisation, addStories)
router.delete("/", Authentication, deleteStories)


module.exports = router
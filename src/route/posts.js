const express = require('express')

const {addPost, getPost, getAllPost, deletePost} = require('../controller/post')
const { Authentication, Authorisation } = require('../middleware/auth')

const router = express.Router()

router.get("/", Authentication ,getAllPost)
router.get("/:userId", Authentication ,getPost)
router.post("/", Authentication, addPost)
router.delete("/", Authentication, deletePost)


module.exports = router
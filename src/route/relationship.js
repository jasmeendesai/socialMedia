const express = require('express')

const {getRelation, addRelation, deleteRelation} = require('../controller/relationship')
const { Authentication } = require('../middleware/auth')

const router = express.Router()

router.get("/", getRelation)

router.post("/", Authentication ,addRelation)
router.delete("/", Authentication, deleteRelation)


module.exports = router
const express = require('express')

const {getUser, updateUser} = require('../controller/user')
const { Authentication, Authorisation } = require('../middleware/auth')

const router = express.Router()

router.get('/find/:userId', getUser)
router.put('/', Authentication, Authorisation, updateUser)

module.exports = router
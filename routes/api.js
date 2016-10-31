const express = require('express')
const router = express.Router()

// connect other routers here!
router.use('/clients', require('./clients'))


module.exports = router

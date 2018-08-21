const express = require('express')
const logger = require('./logger.js')
const router = new express.Router()

router.get('/ping', async(req, res) => {
  res.send('pong!')
})

router.get('/hook', async(req, res) => {
  logger.debug(req.body)
  res.send()
})

module.exports = router
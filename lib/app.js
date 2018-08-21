const express = require('express')
const jsend = require('jsend')
const bodyParser = require('body-parser')
const logger = require('./logger.js')
const routes = require('./routes.js')
const { PORT, NODE_ENV } = require('./constants.js')

const app = express()

// Request logging
app.use(logger.middleware)

// Json parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Add router
app.use(routes)

// Handle 404
app.use((req, res) => {
  res.status(404).send(jsend.error('The requested resource was not found'))
})

// Handle 500
app.use((err, req, res) => {
  logger.error(err.stack)
  const message = (NODE_ENV === 'production') 
    ? 'Something went wrong, we\'re looking into it...' 
    : err.stack
  res.status(500).send(jsend.error(message))
})

app.listen(PORT, () => {
  logger.info(`App listening on port ${PORT}!`)
})

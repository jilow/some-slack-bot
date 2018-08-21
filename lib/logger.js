const morgan = require('morgan')
const tracer = require('tracer')

const logger = tracer.colorConsole()
logger.middleware = morgan('combined')

module.exports = logger
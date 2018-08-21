const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV
const SLACK_TOKEN = process.env.SLACK_TOKEN
const SLACK_CONVERSATION = process.env.SLACK_CONVERSATION

module.exports = { PORT, NODE_ENV, SLACK_TOKEN, SLACK_CONVERSATION }

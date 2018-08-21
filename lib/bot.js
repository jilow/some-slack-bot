const { RTMClient } = require('@slack/client')
const logger = require('./logger')
const { SLACK_TOKEN, SLACK_CONVERSATION } = require('./constants.js')

const bot = new RTMClient(SLACK_TOKEN)
bot.start()

// https://api.slack.com/rtm#events

bot.on('hello', (res) => {
  logger.log('Bot connected!')
})

bot.on('goodbye', (res) => {
  logger.log('Bot disconnected!')
})

bot.on('message', (res) => {
  logger.debug(res)
  if (res.channel !== SLACK_CONVERSATION) return
  bot.sendMessage(`You said:\r\n > ${res.text}`, res.channel)
})

// bot.sendMessage(`Hi, bot is online!`, SLACK_CONVERSATION)
//   .then((res) => {
//     // `res` contains information about the posted message
//     logger.log('Message sent: ', res.ts);
//   })
//   .catch(logger.error)
  
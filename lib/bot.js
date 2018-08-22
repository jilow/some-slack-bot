const { RTMClient, WebClient } = require('@slack/client')
const logger = require('./logger')
const { SLACK_TOKEN, SLACK_CONVERSATION } = require('./constants.js')

const rtm = new RTMClient(SLACK_TOKEN)
rtm.start()

const web = new WebClient(SLACK_TOKEN)

// https://api.slack.com/rtm#events

// web.channels.list()
//   .then((res) => {
//     res.channels.forEach((channel) => {
//       logger.debug(channel.name, channel.id)
//     })
//   })

rtm.on('hello', (res) => {
  logger.info(`rtm connected! User ID: ${rtm.activeUserId}`)
})

rtm.on('goodbye', (res) => {
  logger.info('rtm disconnected!')
})

rtm.on('user_typing', (res) => {
  logger.debug(res)
})

rtm.on('message', (message) => {
  if (message.channel !== SLACK_CONVERSATION) return
  if (message.subtype === 'rtm_message') return
  if (message.subtype === 'bot_message') return
  if (message.user === rtm.activeUserId) return
  logger.debug(message)
  rtm.sendTyping(message.channel)
  setTimeout(() => {
    // rtm.sendMessage(`You said:\r\n > ${message.text}`, message.channel)
    //  .then((sent) => logger.debug(sent))
    web.chat.postMessage({
      channel: message.channel,
      text: 'Hello there',
      attachments: [
        {
          text: "Choose a game to play",
          fallback: "You are unable to choose a game",
          callback_id: "wopr_game",
          color: "#3AA3E3",
          attachment_type: "default",
          actions: [
            {
              name: "game",
              text: "Chess",
              type: "button",
              value: "chess"
            },
            {
              name: "game",
              text: "Falken's Maze",
              type: "button",
              value: "maze"
            },
            {
              name: "game",
              text: "Thermonuclear War",
              style: "danger",
              type: "button",
              value: "war",
              confirm: {
                title: "Are you sure?",
                text: "Wouldn't you prefer a good game of chess?",
                ok_text: "Yes",
                dismiss_text: "No"
              }
            }
          ]
        }
      ]
    })
  }, 1000)
})

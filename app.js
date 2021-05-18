require("dotenv").config()

const TelegramBot = require("node-telegram-bot-api")
const log = require("./utils/log")
const translate = require("./utils/translate")
const turn = require("./utils/turn")

const TOKEN = process.env.BOT_TOKEN
const DOMAIN = process.env.DOMAIN
const PORT = process.env.PORT || 3000

const bot = new TelegramBot(TOKEN, {
  webHook: {
    port: PORT,
  },
})

bot
  .setWebHook(DOMAIN + TOKEN)
  .then(() => bot.getWebHookInfo())
  .then(console.log)

bot.onText(/\/([^\s]+)\ *(.+)*/i, (msg, match) => {
  const [_, cmd, text, ...__] = match

  let [input, replyTo] = ["", 0]
  if (msg.reply_to_message) {
    input = msg.reply_to_message.text
    replyTo = msg.reply_to_message.message_id
  } else {
    input = text
    replyTo = msg.message_id
  }

  if (!input) return log(msg.text + " : No Input")
  log(msg.text)

  function send(t) {
    bot.sendMessage(msg.chat.id, t, {
      reply_to_message_id: replyTo,
    })
  }

  switch (cmd) {
    case "walik":
      send(turn(input))
      break
    case "indo":
      translate(input, "id")
        .then((e) => send(e))
        .catch(console.error)
      break
    case "jowo":
      translate(input)
        .then((e) => send(e))
        .catch(console.error)
      break
    default:
      log(`Command "${cmd}" not found!`)
      break
  }
})

bot.on("webhook_error", console.error)

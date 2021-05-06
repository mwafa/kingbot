const translate = require("./translate")

const TelegramBot = require("node-telegram-bot-api")

const token = process.env.BOT_TOKEN

const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/jawa (.+)/, (msg, match) => {
  const chatId = msg.chat.id
  const resp = match[1]

  translate(resp).then((out) => {
    bot.sendMessage(chatId, out, {
      reply_to_message_id: msg.message_id,
    })
  })
})
bot.onText(/\/indo (.+)/, (msg, match) => {
  const chatId = msg.chat.id
  const resp = match[1]

  translate(resp, "id").then((out) => {
    bot.sendMessage(chatId, out, {
      reply_to_message_id: msg.message_id,
    })
  })
})

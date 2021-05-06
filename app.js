require("dotenv").config()

const translate = require("./tr")

const TelegramBot = require("node-telegram-bot-api")
const turn = require("./walik/main")

const token = process.env.BOT_TOKEN
const bot = new TelegramBot(token, { polling: true })

const log = (t) => {
  console.log(`[${new Date().toISOString()}] ${t}`)
}

const handler = (msg, match, to = "jw") => {
  const chatId = msg.chat.id
  const resp = match[1]

  log(msg.text)
  translate(resp, to).then((out) => {
    bot.sendMessage(chatId, out, {
      reply_to_message_id: msg.message_id,
    })
  })
}

bot.onText(/\/jowo (.+)/, (msg, match) => handler(msg, match))
bot.onText(/\/jawa (.+)/, (msg, match) => handler(msg, match))
bot.onText(/\/indo (.+)/, (msg, match) => handler(msg, match, "id"))

bot.onText(/\/walik (.+)/, (msg, match) => {
  log(msg.text)
  bot.sendMessage(msg.chat.id, turn(match[1]), {
    reply_to_message_id: msg.message_id,
  })
})

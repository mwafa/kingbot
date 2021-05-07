require("dotenv").config()

const translate = require("./tr")

const TelegramBot = require("node-telegram-bot-api")
const turn = require("./walik/main")

const token = process.env.BOT_TOKEN
const bot = new TelegramBot(token, { polling: true })

const log = (t) => {
  console.log(`[${new Date().toISOString()}] ${t}`)
}

const handler = (msg, match, to = "jw", replay = 0) => {
  const chatId = msg.chat.id
  const resp = replay ? msg.pinned_message.text : match[1]
  const pin = replay ? msg.pinned_message.message_id : msg.message_id

  log(msg.text)
  if (replay && !msg.pinned_message) return null
  translate(resp, to)
    .then((out) => {
      bot.sendMessage(chatId, out, {
        reply_to_message_id: pin,
      })
    })
    .catch(log)
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

bot.onText(/\/indo/, (msg, match) => handler(msg, match, "id", 1))
bot.onText(/\/jowo/, (msg, match) => handler(msg, match, "jw", 1))
bot.onText(/\/walik/, (msg, _) => {
  log(msg.text)
  if (!msg.pinned_message) return null
  bot.sendMessage(msg.chat.id, turn(msg.pinned_message.text), {
    reply_to_message_id: msg.pinned_message.message_id,
  })
})

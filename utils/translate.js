const { default: fetch } = require("node-fetch")

const translate = async (text, to = "jw") => {
  const url = process.env.PRIVATE_URL
  const f = {
    jw: {
      from: "id-ID",
      to: "jv-NG",
    },
    id: {
      from: "jv-NG",
      to: "id-ID",
    },
  }[to]
  const out = await fetch(url, {
    method: "POST",
    body: `from=${f.from}&to=${f.to}&source=${encodeURIComponent(text)}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((r) => r.json())
  return out.content.model.basic
}

module.exports = translate

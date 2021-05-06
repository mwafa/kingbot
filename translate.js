const webdriver = require("selenium-webdriver")
const chrome = require("selenium-webdriver/chrome")
const chromedriver = require("chromedriver")

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())

async function translate(text, to = "jw") {
  const f = {
    jw: {
      sl: "id",
      tl: "jw",
    },
    id: {
      sl: "jw",
      tl: "id",
    },
  }[to]
  const t = encodeURI(text)
  const url = `https://translate.google.com/?sl=${f.sl}&tl=${f.tl}&text=${t}&op=translate`

  const browser = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build()
  await browser.get(url)
  const data = await (await browser).findElement(
    webdriver.By.xpath(process.env.XPATH)
  )
  const output = await data.getText()
  await browser.quit()
  return output
}

module.exports = translate

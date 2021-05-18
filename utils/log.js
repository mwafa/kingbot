function log(s) {
  return console.log(`[${new Date().toISOString()}] ${s}`)
}

module.exports = log

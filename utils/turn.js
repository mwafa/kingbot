const char = [
  "h",
  "n",
  "c",
  "r",
  "k",
  "d",
  "t",
  "s",
  "w",
  "l",
  "p",
  "dh",
  "j",
  "y",
  "ny",
  "m",
  "g",
  "b",
  "th",
  "ng",
]

const invalidChar = {
  q: "k",
  f: "p",
  z: "j",
  x: "s",
  v: "p",
}

function change(m) {
  const n = char.indexOf(m)
  const i = n >= 10 ? n - 10 : n + 10
  if (n == -1) return m.split("").map(change).join("")
  return char[i]
}

function turn(text) {
  let w = text.toLowerCase()

  for (const c of Object.keys(invalidChar)) {
    w = w.replace(c, invalidChar[c])
  }

  const reg = /([^aiueo\ \W\d]{1,2})/gm
  return w
    .replace(/(\b(a|i|u|e|o){1}\w+)/gm, "h$1")
    .replace(reg, (m) => change(m) || "")
    .replace(/\b(h)(\w+)/gm, "$2")
}

module.exports = turn

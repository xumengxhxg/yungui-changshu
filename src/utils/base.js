let Base64 = require('js-base64').Base64

export function decode(val) {
  Base64.decode(val)
}

export function encode(val) {
  let newVal = Base64.encode(val)
  return newVal
}
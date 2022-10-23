import clearLocal from './clearStorage'
import fillData from './fillData'

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  if (msg['action'] === 'login') {
    clearLocal(msg)
    callback(msg['open'])
  } else if (msg['action'] === 'fullFill') {
    fillData(msg)
    callback('fullFill')
  } else {
    callback('error')
  }
})

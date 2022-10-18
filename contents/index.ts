import type {PlasmoContentScript} from 'plasmo'

import clearLocal from './clearStorage'
import fillData from './fillData'

export const config: PlasmoContentScript = {
  matches: ['<all_urls>'],
  all_frames: true
}

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  if (msg['action'] === 'login') {
    clearLocal(msg)
    callback(msg['open'])
  } else if (msg['action'] === 'fillKeyFull') {
    fillData(msg['link'])
    // getText()
  } else if (msg === 'checkElement') {
    const element = document.querySelectorAll('input.none-input-file')
    callback(element.length > 0 ? true : false)
  } else {
    callback('error')
  }
})

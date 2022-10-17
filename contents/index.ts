import type {PlasmoContentScript} from 'plasmo'

import clearLocal from './clearStorage'

export const config: PlasmoContentScript = {
  matches: ['<all_urls>'],
  all_frames: true
}

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  if (msg['action'] === 'login') {
    clearLocal(msg)
    callback(msg['open'])
  } else {
    callback('good')
  }
})

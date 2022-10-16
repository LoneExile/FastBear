import type {PlasmoContentScript} from 'plasmo'

export const config: PlasmoContentScript = {
  matches: ['<all_urls>'],
  all_frames: true
}

const clearLocal = (msg: any) => {
  var archive: any = {},
    keys = Object.keys(localStorage),
    i = keys.length
  while (i--) {
    archive[keys[i]] = localStorage.getItem(keys[i])
  }
  localStorage.clear()
  if (msg['open']) {
    window.open(msg['link'], '_self')?.focus
  }
}

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  if (msg['action'] === 'login') {
    clearLocal(msg)
    callback(msg['open'])
  } else {
    callback('good')
  }
})

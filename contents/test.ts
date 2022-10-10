import type {PlasmoContentScript} from 'plasmo'

export const config: PlasmoContentScript = {
  matches: ['<all_urls>']
  // all_frames: true
}

console.log(
  'You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true.'
)
// window.addEventListener('load', () => {
//   console.log('content script loaded')
//
//   document.body.style.background = 'pink'
// })

// import icon from 'data-base64:~assets/icon.png'
// import {fetchUtilsUrl} from './utils/fetcher'
import {Storage} from '@plasmohq/storage'

export {}

// fetchUtilsUrl().then((res) => {
//   console.log('background.ts')
//   console.log(res)
// })

// TODO: prepare for set alert notification
const storageData = async () => {
  const storage = new Storage()
  await storage.set('key', 'value')
  const data = await storage.get('key')
  return data
}

storageData().then((res) => {
  console.log('background.ts')
  console.log(res)
})

// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === 'toilet') {
//     chrome.notifications.create('toilet', {
//       type: 'basic',
//       iconUrl: icon,
//       title: 'Free now',
//       message: "Let's go to toilet'",
//       priority: 2
//     })
//   }
// })

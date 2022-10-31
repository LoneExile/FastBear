import icon from 'data-base64:~assets/icon.png'

import {Storage} from '@plasmohq/storage'

export {}

const storage = new Storage()

const storageData = async () => {
  const selectedRoom = await storage.get('selectedRoom')
  if (selectedRoom) {
    return JSON.parse(selectedRoom)
  }
  return null
}

var storeData = []

const checkToilet = async () => {
  const data = await storageData()
  if (data) {
    const urlObj = await storage.get('utilityUrl')
    const url = JSON.parse(urlObj)[0].url
    const storeDataBefore = JSON.parse(JSON.stringify(storeData))
    const isNotifyOn = await storage.get('isNotifyOn')
    storeData = []
    for (const [key, _] of Object.entries(data)) {
      const res = await fetch(url + key.toString(), {})
      let data = await res.clone().json()
      storeData = [...storeData, data]
    }
    return {storeData, storeDataBefore, isNotifyOn}
  } else {
    return {storeData, storeDataBefore: [], isNotifyOn: 'false'}
  }
}

const prepareNotification = async () => {
  const {storeData, storeDataBefore, isNotifyOn} = await checkToilet()
  if (storeData && isNotifyOn === 'true') {
    if (storeDataBefore.length === storeData.length) {
      for (let i = 0; i < storeData.length; i++) {
        for (let j = 0; j < storeData[i].length; j++) {
          if (
            storeData[i][j].isAvailable !== storeDataBefore[i][j].isAvailable &&
            storeData[i][j].isAvailable === false
          ) {
            setNotify(storeData[i][j].floor)
          }
        }
      }
    }
  }
}

setInterval(() => prepareNotification(), 2000)

const setNotify = async (ft: number) => {
  chrome.notifications.create('toilet', {
    type: 'basic',
    iconUrl: icon,
    title: 'FastToilet: Floor' + ft,
    message: "Free now!, Let's go to toilet'",
    priority: 2
  })

  setTimeout(() => {
    chrome.notifications.clear('toilet', () => {})
  }, 5000)
}

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

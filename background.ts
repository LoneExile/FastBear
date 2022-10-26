import icon from 'data-base64:~assets/icon.png'

import {Storage} from '@plasmohq/storage'

import {fetchUtilsUrl} from './utils/fetcher'

export {}

// TODO: refactor this
const storageData = async () => {
  const storage = new Storage()
  let data2 = await storage.get('enableNotify-ft2')
  let data3 = await storage.get('enableNotify-ft3')
  if (!data2 || !data3) {
    console.log('no data')
    await storage.set('enableNotify-ft2', 'true')
    await storage.set('enableNotify-ft3', 'true')
  }
  const ls2 = await storage.get('enableNotify-ft2')
  const ls3 = await storage.get('enableNotify-ft3')

  return {ls2, ls3}
}

var statusFt2Men: boolean | undefined
var statusFt2Women: boolean | undefined
var statusFt3Men: boolean | undefined
var statusFt3Women: boolean | undefined

const getToilet = async () => {
  const {ls2, ls3} = await storageData()
  const res = await fetchUtilsUrl()

  if (ls2 === 'true') {
    console.log('ls2 is true')
    const url2 = res[0].url + '2'
    const res2 = await fetch(url2, {})
    let data2 = await res2.clone().json()
    if (statusFt2Men !== undefined && statusFt2Men !== null) {
      if (
        (statusFt2Men !== data2[0].isAvailable ||
          statusFt2Women !== data2[1].isAvailable) &&
        (data2[0].isAvailable === false || data2[1].isAvailable === false)
      ) {
        setNotify(2).then(() => {
          statusFt2Men = data2[0].isAvailable
          statusFt2Women = data2[1].isAvailable
        })
      }
    } else {
      statusFt2Men = data2[0].isAvailable
      statusFt2Women = data2[1].isAvailable
    }
  }

  if (ls3 === 'true') {
    console.log('ls3 is true')
    const url3 = res[0].url + '3'
    const res3 = await fetch(url3, {})
    let data3 = await res3.clone().json()
    if (statusFt3Men !== undefined && statusFt3Men !== null) {
      // console.log(
      //   'status',
      //   statusFt3Men !== data3[0].isAvailable && data3[0].isAvailable !== true
      // )
      if (
        statusFt3Men !== data3[0].isAvailable &&
        data3[0].isAvailable !== true
      ) {
        setNotify(3).then(() => {
          statusFt3Men = data3[0].isAvailable
        })
      }
      if (
        statusFt3Women !== data3[1].isAvailable &&
        data3[1].isAvailable !== true
      ) {
        setNotify(3).then(() => {
          statusFt3Women = data3[1].isAvailable
        })
      }
    } else {
      statusFt3Men = data3[0].isAvailable
      statusFt3Women = data3[1].isAvailable
    }
  }
}

const setNotify = async (ft: number) => {
  chrome.notifications.create('toilet', {
    type: 'basic',
    iconUrl: icon,
    title: 'FastToilet: Floor' + ft,
    message: "Free now!, Let's go to toilet'",
    priority: 2
  })
  console.log('setNotify')
}

// setInterval(() => getToilet(), 1000)

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

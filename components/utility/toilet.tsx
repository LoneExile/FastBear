import {faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import icon from 'data-base64:~assets/icon.png'
import {useEffect} from 'react'
import React from 'react'

import {Storage} from '@plasmohq/storage'

import useLoadingStore from '../../storage/loadStatus'
import useUtilityStore from '../../storage/utility'
import {fetchUtilsUrl} from '../../utils/fetcher'
import Loading from '../main/loading'
import Title from './title'

const Toilet = () => {
  const loadingState = useLoadingStore((state) => state.loadingStatus)
  const utilityData = useUtilityStore((state) => state.utilityData)
  const toiletData = useUtilityStore((state) => state.toiletData)
  const isUtilityInLS = Object.keys(utilityData).length === 0
  const isToiletInLS = Object.keys(toiletData).length === 0

  // TODO: prepare for set alert notification
  const storageData = async () => {
    const storage = new Storage()
    // await storage.set('key', 'value')
    const data = await storage.get('key')
    return data
  }

  // storageData().then((res) => {
  //   console.log('popup')
  //   console.log(res)
  // })

  useEffect(() => {
    try {
      if (!isToiletInLS && !isUtilityInLS) {
        // FIX: This, I don't like it
        setInterval(() => fetchToilet(), 1000)
      }
      if (isUtilityInLS) {
        fetchUtility()
      }
    } catch (e) {
      useLoadingStore.getState().setLoadingStatus(false)
    }
  }, [])

  const fetchToilet = async () => {
    const url2 = utilityData[0].url + '2'
    const res2 = await fetch(url2, {})
    let data2 = await res2.clone().json()

    const url3 = utilityData[0].url + '3'
    const res3 = await fetch(url3, {})
    let data3 = await res3.clone().json()

    const dataAll = data2.concat(data3)

    useUtilityStore.getState().setToiletData(dataAll)

    // chrome.alarms.create('toilet', {
    //   when: Date.now() + 1000
    // })
  }

  // FIX: This, I don't like it
  if (isToiletInLS && !isUtilityInLS) {
    fetchToilet()
  }

  const fetchUtility = () => {
    useLoadingStore.getState().setLoadingStatus(true)
    if (isUtilityInLS) {
      fetchUtilsUrl().then((data) => {
        useLoadingStore.getState().setLoadingStatus(false)
        useUtilityStore.getState().setUtilityData(data)
      })
    }
  }

  const ToiletStatus = () => {
    let ArrComponet = []
    for (let i = 0; i < Object.keys(toiletData).length / 2; i++) {
      let arr = []
      arr.push(toiletData[i * 2])
      arr.push(toiletData[i * 2 + 1])
      const statusMen = Object.values(arr).filter(
        (item) => item['gender']['name'] === 'Male'
      )
      const statusWomen = Object.values(arr).filter(
        (item) => item['gender']['name'] === 'Female'
      )
      let classstatus = (status: boolean) => {
        if (!status) {
          return 'text-[48px] text-success'
        } else {
          return 'text-[48px] text-error'
        }
      }

      const convertMilisecToTime = (milisec: number) => {
        const duration = milisec
        const hours = Math.floor(duration / 3600000)
        const minutes = Math.floor((duration % 3600000) / 60000)
        const seconds = Math.floor(((duration % 3600000) % 60000) / 1000)
        const durationString = `${hours}:${minutes}:${seconds}`
        return durationString.toString()
      }

      // if (statusMen[0].isAvailable === false || statusWomen[0].isAvailable === false) {
      //   chrome.notifications.create('test', {
      //     type: 'basic',
      //     iconUrl: icon,
      //     title: 'Test Message',
      //     message: 'You are awesome!',
      //     priority: 2
      //   })
      // }

      const statusComponent = (
        <div
          key={i}
          className="mt-[5%] rounded-md text-center bg-neutral border-transparent w-[50%]">
          <div className="text-current mb-[5%]">
            <span>ft.{statusMen[0].floor}</span>
          </div>
          <FontAwesomeIcon
            icon={faPerson}
            className={classstatus(statusMen[0].isAvailable)}
          />
          <FontAwesomeIcon
            icon={faPersonDress}
            className={classstatus(statusWomen[0].isAvailable)}
          />
          <div className="mt-[5%] text-current">
            <span>
              {!statusMen[0].isAvailable
                ? convertMilisecToTime(0)
                : convertMilisecToTime(statusMen[0].duration)}
            </span>
            <span>{' | '}</span>
            <span>
              {!statusWomen[0].isAvailable
                ? convertMilisecToTime(0)
                : convertMilisecToTime(statusWomen[0].duration)}
            </span>
          </div>
        </div>
      )
      ArrComponet.push(statusComponent)
    }
    return <>{ArrComponet}</>
  }

  if (loadingState) {
    return <Loading Title={Title} />
  }

  return (
    <>
      <Title />
      <ToiletStatus />
    </>
  )
}

export default Toilet

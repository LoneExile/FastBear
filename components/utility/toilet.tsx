import {faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useEffect} from 'react'
import React from 'react'
import shallow from 'zustand/shallow'

import {Storage} from '@plasmohq/storage'

import useUtilityStore from '../../storage/utility'
import {fetchUtilsUrl} from '../../utils/fetcher'
import Title from './title'

const Toilet = () => {
  const storage = new Storage()
  const {utilityData, toiletData, toiletRoomSelected, toiletAllRooms} =
    useUtilityStore(
      (state) => ({
        utilityData: state.utilityData,
        toiletData: state.toiletData,
        toiletRoomSelected: state.toiletRoomSelected,
        toiletAllRooms: state.toiletAllRooms
      }),
      shallow
    )

  const fetchUtility = async () => {
    fetchUtilsUrl().then((data) => {
      useUtilityStore.getState().setUtilityData(data)
    })
    await storage.set('selectedRoom', JSON.stringify(toiletRoomSelected))
    for (let i = 0; i < Object.keys(toiletRoomSelected).length; i++) {
      const key = 'enableNotify-ft' + Object.values(toiletRoomSelected)[i]
      await storage.set(key, 'true')
      console.log(key, await storage.get(key))
    }
  }

  useEffect(() => {
    try {
      const isUtilityInLS = Object.keys(utilityData).length === 0
      const isToiletInLS = Object.keys(toiletData).length === 0

      if (isUtilityInLS) {
        fetchUtility()
      }
      if (isToiletInLS && !isUtilityInLS) {
        fetchToilet()
      }
      // if (!isToiletInLS && !isUtilityInLS) {
      // FIX: This, error first time load
      setInterval(() => fetchToilet(), 3000)
      // }
    } catch (e) {
      console.log(e)
    }
  }, [])

  const fetchToilet = async () => {
    // TODO: add loading when fetcing data

    var allData = []
    for (let i = 0; i < Object.keys(toiletRoomSelected).length; i++) {
      let room = Object.keys(toiletRoomSelected)[i]
      let url = utilityData[0].url + room
      let response = await fetch(url)
      let data = await response.clone().json()
      allData = [...allData, data]
    }
    console.log('dataAll', allData)
    useUtilityStore.getState().setToiletData(allData)
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

      // TODO: make it smooth, change when status change
      // const convertMilisecToTime = (milisec: number) => {
      //   const duration = milisec
      //   const hours = Math.floor(duration / 3600000)
      //   const minutes = Math.floor((duration % 3600000) / 60000)
      //   const seconds = Math.floor(((duration % 3600000) % 60000) / 1000)
      //   const durationString = `${hours}:${minutes}:${seconds}`
      //   return durationString.toString()
      // }

      const statusComponent = (
        <div
          className="border-2 m-2 border-neutral text-center rounded-md w-[40%]"
          key={i}>
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
            {/*
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
              */}
          </div>
        </div>
      )
      ArrComponet.push(statusComponent)
    }

    return (
      <>
        <div className="flex flex-wrap">{ArrComponet}</div>
      </>
    )
  }

  const checkNotify = async (
    e: React.ChangeEvent<HTMLInputElement>,
    ft: number
  ) => {
    const status = e.target.checked
    if (ft === 2) {
      console.log('status', status)
      await storage.set('enableNotify-ft2', status.toString())
    }
    if (ft === 3) {
      console.log('status', status)
      await storage.set('enableNotify-ft3', status.toString())
    }
  }

  // if (loadingState) {
  //   return <Loading Title={Title} />
  // }

  const AddRoom = () => {
    return (
      <div className="flex justify-center">
        <div className=" form-control mt-2">
          <div className="input-group">
            <select className="select select-bordered select-sm text-xs ">
              <option>1</option>
              <option>2</option>
            </select>
            <button className="btn btn-sm">Add</button>
          </div>
        </div>
      </div>
    )
  }

  const checkBoxSetting = () => {
    return (
      <div>
        <div className="form-control mt-[5%] flex">
          <label
            className="label cursor-pointer font-bold text-neutral tooltip"
            data-tip="Notify me">
            <div className="badge badge-xs mr-[4%]">Floor 2</div>
            <input
              type="checkbox"
              checked={true}
              onChange={(e) => {
                checkNotify(e, 2)
              }}
              className="checkbox checkbox-xs checkbox-primary"
            />
            {' || '}
            <div className="badge badge-xs mr-[4%]">Floor 3</div>
            <input
              type="checkbox"
              checked={true}
              onChange={(e) => {
                checkNotify(e, 3)
              }}
              className="checkbox checkbox-xs checkbox-primary"
            />
          </label>
        </div>
      </div>
    )
  }

  return (
    <>
      <Title />
      <AddRoom />
    </>
  )
}

export default Toilet

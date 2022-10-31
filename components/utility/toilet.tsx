import {
  faPerson,
  faPersonDress,
  faRotateRight
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useQuery} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import React from 'react'
import shallow from 'zustand/shallow'

import {Storage} from '@plasmohq/storage'

import useTabStore from '../../storage/tab'
import useUtilityStore from '../../storage/utility'
import {fetchUtilsUrl} from '../../utils/fetcher'
import Loading from '../main/loading'
import Title from './title'

const Toilet = () => {
  const storage = new Storage()

  const {
    utilityData,
    toiletData,
    toiletRoomSelected,
    toiletAllRooms,
    isAutoFetch
  } = useUtilityStore(
    (state) => ({
      utilityData: state.utilityData,
      toiletData: state.toiletData,
      toiletRoomSelected: state.toiletRoomSelected,
      toiletAllRooms: state.toiletAllRooms,
      isAutoFetch: state.isAutoFetch
    }),
    shallow
  )

  const fetchUtility = async () => {
    const data = await fetchUtilsUrl()
    useUtilityStore.getState().setUtilityData(data)

    await storage.set('selectedRoom', JSON.stringify(toiletRoomSelected))
    for (let i = 0; i < Object.keys(toiletRoomSelected).length; i++) {
      const key = 'enableNotify-ft' + Object.values(toiletRoomSelected)[i]
      await storage.set(key, 'true')
      // console.log(key, await storage.get(key))
    }

    return data
  }

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
    useUtilityStore.getState().setToiletData(allData)
    return allData
  }

  const isUtilityInLS = (utilityData[0]?.url).length > 0
  const {} = useQuery(['utilsUrl'], fetchUtility, {
    enabled: !isUtilityInLS
  })
  // const {isLoading} = useQuery(['toiletData'], fetchToilet, {
  //   enabled: isUtilityInLS
  // })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    // NOTE: it do one time
    try {
      if (isUtilityInLS) {
        fetchToilet().then(() => {
          setIsLoading(false)
          useTabStore.getState().setTab(3)
        })
        if (isAutoFetch) {
          setInterval(() => {
            fetchToilet()
          }, 1500)
        }
      }
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }, [isUtilityInLS, isAutoFetch])

  if (isLoading) {
    return <Loading Title={Title} />
  } else {
    const ToiletStatus = () => {
      let ArrComponet = []
      for (let i = 0; i < Object.keys(toiletData).length; i++) {
        let arr = []
        arr = [...arr, toiletData[i]]
        const statusMen = Object.values(arr[0]).filter(
          (item) => item['gender']['name'] === 'Male'
        )
        const statusWomen = Object.values(arr[0]).filter(
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
        const convertMilisecToTime = (milisec: number) => {
          const duration = milisec
          const hours = Math.floor(duration / 3600000)
          const minutes = Math.floor((duration % 3600000) / 60000)
          const seconds = Math.floor(((duration % 3600000) % 60000) / 1000)
          const durationString = `${hours}:${minutes}:${seconds}`
          return durationString.toString()
        }

        const statusComponent = (
          <div
            className="border-2 mx-2 mt-2 border-neutral text-center rounded-md w-[40%]"
            key={i}>
            <div className="text-current mb-[5%]">
              <span>ft.{statusMen[0]['floor']}</span>
            </div>
            <FontAwesomeIcon
              icon={faPerson}
              className={classstatus(statusMen[0]['isAvailable'])}
            />
            <FontAwesomeIcon
              icon={faPersonDress}
              className={classstatus(statusWomen[0]['isAvailable'])}
            />
            <div className="mt-[5%] text-current">
              <span>
                {!statusMen[0]['isAvailable']
                  ? convertMilisecToTime(0)
                  : convertMilisecToTime(statusMen[0]['duration'])}
              </span>
              <span>{' | '}</span>
              <span>
                {!statusWomen[0]['isAvailable']
                  ? convertMilisecToTime(0)
                  : convertMilisecToTime(statusWomen[0]['duration'])}
              </span>
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

    const roomOption = () => {
      let arr = []
      for (let i = 0; i < Object.keys(toiletAllRooms).length; i++) {
        arr.push(
          <option value={Object.values(toiletAllRooms)[i]} key={i}>
            {Object.values(toiletAllRooms)[i]}
          </option>
        )
      }
      return arr
    }

    const getCurrentSelected = () => {
      const current = document.getElementById(
        'selectedRoom'
      ) as HTMLSelectElement

      if (Object.keys(toiletRoomSelected).includes(current.value.toString())) {
        const toiletRoom = JSON.parse(JSON.stringify(toiletRoomSelected))
        delete toiletRoom[current.value]
        useUtilityStore.getState().setToiletSelected(toiletRoom)
      } else {
        const toiletRoom = JSON.parse(JSON.stringify(toiletRoomSelected))
        toiletRoom[current.value] = true
        useUtilityStore.getState().setToiletSelected(toiletRoom)
      }
      // WARN: Hmmmmmmm
      location.reload()
    }

    const AddRoom = () => {
      const toggleAutoFetch = () => {
        useUtilityStore.getState().setIsAutoFetch(!isAutoFetch)
        // WARN: Hmmmmmmm
        location.reload()
      }

      return (
        <div className="flex justify-around">
          <div className="form-control tooltip" data-tip="Notify Me">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                // checked={true}
                className="checkbox checkbox-primary mr-2 mt-[12.5%]"
              />
            </label>
          </div>

          <div className="flex mt-2 px-1">
            {/* // border-2 border-transparent border-r-primary border-l-primary */}
            <div className="input-group">
              <select
                id="selectedRoom"
                className="select select-bordered select-sm text-xs ">
                {roomOption()}
              </select>
              <button
                className="btn btn-sm tooltip"
                data-tip="Add/Remove"
                onClick={() => getCurrentSelected()}>
                🌟
              </button>
            </div>
          </div>
          <div className="flex">
            <div className="form-control tooltip " data-tip="AutoFetch">
              <label className="label cursor-pointer pb-0 pt-[40%] flex items-center">
                <input
                  type="checkbox"
                  onChange={() => toggleAutoFetch()}
                  checked={isAutoFetch}
                  className="checkbox checkbox-primary"
                />
              </label>
            </div>
            <button
              className="tooltip btn btn-outline border-2 btn-sm font-bold mt-2"
              data-tip="Update"
              disabled={isAutoFetch}
              onClick={() => fetchToilet()}>
              {/* TODO: add loading */}
              <FontAwesomeIcon icon={faRotateRight} />
            </button>
          </div>
        </div>
      )
    }

    const LoadingAutoFetch = () => {
      if (isAutoFetch) {
        return <progress className="progress w-[100%]"></progress>
      }
    }

    return (
      <>
        <Title />
        <AddRoom />
        <ToiletStatus />
        <LoadingAutoFetch />
      </>
    )
  }
}

export default Toilet

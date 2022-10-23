import {useEffect, useState} from 'react'
import shallow from 'zustand/shallow'

import useFillStore from '../../storage/loadFill'
import useLoadingStore from '../../storage/loadStatus'
import {fetchFillData} from '../../utils/fetcher'
import Loading from '../main/loading'
import DetectCurrentUrl from './detectCurrentUrl'
import Title from './title'

// TODO: check element/url before enable buttom autofill
// TODO: ping check is vpn enable (ping?)
// TODO: check user E-mail before render
// TODO: add notification when detect match url

export default function FastFilling() {
  const loadingState = useLoadingStore((state) => state.loadingStatus)

  // BUG: can't use zuastand to set these state, cause tab not render correctly
  const [isDetectFill, setIsDetectFill] = useState(false)
  const [matchFillName, setMatchFillName] = useState('')
  const [idlMatchFillName, setIdMatchFillName] = useState(0)
  const [currentSheetName, setCurrentSheetName] = useState('')

  const {fillData} = useFillStore(
    (state) => ({
      fillData: state.fillData
    }),
    shallow
  )

  const isHaveFillData = Object.keys(fillData).length === 0
  if (!isHaveFillData) {
    var fillDataFilter = {...fillData} // WARN: Shallow Clone
    delete fillDataFilter['devList']
    var devList = {...fillData['devList']}
  }

  useEffect(() => {
    try {
      if (isHaveFillData) {
        fetchFillingData()
      }
      checkCurrentTab()
    } catch (e) {
      useLoadingStore.getState().setLoadingStatus(false)
    }
  }, [])

  useEffect(() => {
    // NOTE: IDK why, but it works
    const reg = /\[(\d+)\](.*)/
    for (let i = 0; i < Object.values(fillDataFilter).length; i++) {
      if (Object.keys(fillDataFilter)[i].match(reg)) {
        const sheetNameId = Object.keys(fillDataFilter)[i].match(reg)[1]
        if (sheetNameId === idlMatchFillName.toString()) {
          setCurrentSheetName(Object.keys(fillDataFilter)[i])
          break
        }
      }
    }
  }, [idlMatchFillName])

  const checkCurrentTab = async () => {
    setIsDetectFill(false)
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      // const currentTabsID = tabs.length === 0 ? 0 : tabs[0].id!
      var url = tabs[0].url
      // console.log('tabs status', tabs[0].status)
      for (let i = 0; i < fillData['devList'].length; i++) {
        const reg = fillData['devList'][i].regUrl
        if (url.match(reg)) {
          setIsDetectFill(true)
          setMatchFillName(fillData['devList'][i].name)
          setIdMatchFillName(fillData['devList'][i].id)
          break
        }
      }
    })
  }

  if (loadingState) {
    return <Loading Title={Title} />
  }

  const fetchFillingData = () => {
    useLoadingStore.getState().setLoadingStatus(true)
    fetchFillData().then((data) => {
      useLoadingStore.getState().setLoadingStatus(false)
      useFillStore.getState().setFillData(data)
    })
  }

  const setCurrentSheet = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentSheetName(e.target.value)
  }

  const sheetOptions = () => {
    var arr = []
    var firstValueArr = []
    const reg = /\[(\d+)\](.*)/
    for (let i = 0; i < Object.values(fillDataFilter).length; i++) {
      if (Object.keys(fillDataFilter)[i].match(reg)) {
        const sheetName = Object.keys(fillDataFilter)[i].match(reg)[2]
        const sheetNameId = Object.keys(fillDataFilter)[i].match(reg)[1]
        if (sheetNameId === idlMatchFillName.toString()) {
          firstValueArr.push(Object.keys(fillDataFilter)[i])
          arr.push(
            <option key={i} value={Object.keys(fillDataFilter)[i]}>
              {sheetName}
            </option>
          )
        }
      }
    }
    return arr
  }

  const DropDownFillName = () => {
    // TODO: make selector box bigger, so can display more characters
    return (
      <div className="flex w-[100%] h-[20%] mt-[2%] item-center px-[2%]">
        <select
          className="select select-info border-2 w-[100%] mx-auto"
          onChange={setCurrentSheet}
          disabled={!isDetectFill}
          value={currentSheetName}>
          {sheetOptions()}
        </select>
      </div>
    )
  }

  const FillOptions = () => {
    return (
      <div className="flex flex-wrap justify-around items-center border-transparent">
        <DropDownFillName />
      </div>
    )
  }

  const fillCurrent = () => {
    if (currentSheetName !== '') {
      chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
        const currentTabsID = tabs.length === 0 ? 0 : tabs[0].id!
        var fillMessage = {
          action: 'fullFill',
          link: chrome.runtime.getURL(`assets/numberPic/`),
          tabId: currentTabsID,
          fillData: fillData[currentSheetName][0]
        }
        chrome.tabs.sendMessage(currentTabsID, fillMessage, (response) => {
          console.log('Response from content: ', response)
        })
      })
    }
  }

  const ButtomFill = () => {
    return (
      <div className="flex flex-wrap justify-between mt-2 mx-2">
        <div className="flex w-[100%] h-[20%] mt-[2%] item-center px-[2%]">
          <button
            className="btn btn-outline btn-success"
            onClick={() => fillCurrent()}
            disabled={!isDetectFill}>
            AutoFill
          </button>
          <div className="ml-auto w-[45%] my-auto">
            <button
              className="tooltip btn btn-outline border-2 btn-sm font-bold mr-[10%]"
              onClick={() => fetchFillingData()}
              data-tip="Update">
              📥
            </button>
            <button
              className="tooltip btn btn-outline border-2 btn-sm font-bold"
              onClick={() => window.open('#', '_blank')?.focus}
              data-tip="Edit">
              📝
            </button>
          </div>
        </div>
      </div>
    )
  }

  const detectProps = {
    isDetectFill: isDetectFill,
    matchFillName: matchFillName
  }

  return (
    <>
      <Title />
      <DetectCurrentUrl {...detectProps} />
      <FillOptions />
      <ButtomFill />
    </>
  )
}

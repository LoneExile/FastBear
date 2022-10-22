import {useEffect} from 'react'

import useFillStore from '../../storage/loadFill'
import useLoadingStore from '../../storage/loadStatus'
import {fetchFillData} from '../../utils/fetcher'
import Loading from '../main/loading'
import DetectCurrentUrl from './detectCurrentUrl'
import Title from './title'

export default function About() {
  const fillData = useFillStore((state) => state.fillData)
  const isDetectFill = useFillStore((state) => state.detectFillData)
  const matchFillName = useFillStore((state) => state.matchFillUrl)
  const loadingState = useLoadingStore((state) => state.loadingStatus)

  const isHaveFillData = Object.keys(fillData).length === 0
  if (!isHaveFillData) {
    var fillDataFilter = {...fillData}
    delete fillDataFilter['devList']
    var devList = {...fillData['devList']} // WARN: Shallow Clone
  }

  console.log(fillData)
  console.log(matchFillName)
  console.log(fillDataFilter)
  console.log(devList)

  useEffect(() => {
    try {
      if (isHaveFillData) {
        fetchFillingData()
      }
    } catch (e) {
      useLoadingStore.getState().setLoadingStatus(false)
    }

    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      const currentTabsID = tabs.length === 0 ? 0 : tabs[0].id!
      var url = tabs[0].url
      console.log('url', url)
      console.log('currentTabsID', currentTabsID)
      console.log('tabs status', tabs[0].status)
      useFillStore.getState().setDetectFillData(false)
      for (let i = 0; i < fillData['devList'].length; i++) {
        const reg = fillData['devList'][i].regUrl
        if (url.match(reg)) {
          console.log('match')
          useFillStore.getState().setDetectFillData(true)
          useFillStore.getState().setMatchFillUrl(fillData['devList'][i].name)
          break
        }
      }
    })
  }, [])

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

  const detectProps = {
    isDetectFill: isDetectFill,
    matchFillName: matchFillName
  }

  return (
    <>
      <Title />
      <DetectCurrentUrl {...detectProps} />
    </>
  )
}

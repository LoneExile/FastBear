import {useEffect} from 'react'
import shallow from 'zustand/shallow'

import useLoadingStore from '../../storage/loadStatus'
import useLoginStore from '../../storage/loginData'
import {fetchLoginData, fetchLoginUrl} from '../../utils/fetcher'
import ListLogin from './listLogin'
import SelectorEnv from './selectorEnv'
import Title from './title'

export default function FastLogin() {
  const {loginData, loginUrl} = useLoginStore(
    (state) => ({
      loginData: state.loginData,
      loginUrl: state.loginUrl
    }),
    shallow
  )
  const loadingState = useLoadingStore((state) => state.loadingStatus)
  const isLoginInLS =
    (loginData || loginUrl) &&
    (Object.keys(loginData).length === 0 || Object.keys(loginUrl).length === 0)

  useEffect(() => {
    if (isLoginInLS) {
      fetchLogin()
    } else {
      useLoadingStore.getState().setLoadingStatus(false)
    }

    // TODO: check element
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      const currentTabsID = tabs.length === 0 ? 0 : tabs[0].id!
      var url = tabs[0].url
      if (url?.substring(0, 4) === 'http') {
        chrome.tabs.sendMessage(currentTabsID, 'checkElement', (response) => {
          // setIsCanFill(response)
        })
      } else {
        // setIsCanFill(false)
      }
    })
  }, [])

  if (loadingState) {
    return (
      <>
        <Title />
        <figure>
          <img
            className="w-[200px] h-[200px] rounded-full m-auto mt-[2%]"
            src="../../assets/dance-party.gif"
            alt="Loading..."
          />
        </figure>
        <progress className="progress mx-auto mt-auto"></progress>
      </>
    )
  }

  const fetchLogin = () => {
    useLoadingStore.getState().setLoadingStatus(true)
    fetchLoginUrl().then((data) => {
      useLoginStore.getState().setLoginUrl(data)
      fetchLoginData().then((data) => {
        useLoadingStore.getState().setLoadingStatus(false)
        useLoginStore.getState().setLoginData(data)
        useLoginStore.getState().setCurrentEnv(Object.keys(data)[0])
      })
    })
  }

  const keyfullFill = () => {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      const currentTabsID = tabs.length === 0 ? 0 : tabs[0].id!
      var fillMessage = {
        action: 'fillKeyFull',
        link: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Ours_brun_parcanimalierpyrenees_1.jpg'
      }
      chrome.tabs.sendMessage(currentTabsID, fillMessage, (response) => {
        console.log('Response from content: ', response)
      })
    })
  }

  const AutoFill = () => {
    return (
      <>
        <div
          id="autoFill"
          className="flex  mb-2 mt-0 border-double border-2 rounded-md border-slate-900">
          <button className="btn btn-sm  m-1.5" onClick={() => keyfullFill()}>
            📜 Fill data
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <Title />
      <SelectorEnv
        fetchLogin={() => {
          fetchLogin()
        }}
      />
      <ListLogin />
      <AutoFill />
    </>
  )
}

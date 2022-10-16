import {useEffect, useState} from 'react'

import useLoginStore from '../../storage/loginData'
import {fetchLoginData, fetchLoginUrl} from '../../utils/fetcher'
import SelectorEnv from './selectorEnv'

export default function FastLogin() {
  const [isLoading, setLoading] = useState(false)
  const loginData = useLoginStore((state) => state.loginData)
  const loginUrl = useLoginStore((state) => state.loginUrl)
  const currentEnv = useLoginStore((state) => state.currentEnv)
  const checkLoginLS =
    (loginData || loginUrl) &&
    (Object.keys(loginData).length === 0 || Object.keys(loginUrl).length === 0)

  useEffect(() => {
    fetchLogin()
  }, [])

  const Header = () => {
    return (
      <>
        <h1 className="text-3xl font-bold border-2 rounded-md text-center bg-secondary border-transparent">
          FastLogin
        </h1>
      </>
    )
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <figure>
          <img
            className="w-[200px] h-[200px] rounded-full m-auto"
            src="https://media.tenor.com/dZ0ost9JVMsAAAAC/dance-party.gif"
            alt="Shoes"
          />
        </figure>
        <progress className="progress mx-auto mt-auto"></progress>
      </>
    )
  }

  const fetchLogin = () => {
    if (checkLoginLS) {
      setLoading(true)
      fetchLoginUrl().then((data) => {
        useLoginStore.getState().setLoginUrl(data)
        fetchLoginData().then((data) => {
          useLoginStore.getState().setLoginData(data)
          useLoginStore.getState().setCurrentEnv(Object.keys(data)[0])
          setLoading(false)
        })
      })
    } else {
      setLoading(false)
    }
  }

  function openLogin(user: string, setEnv: string) {
    let linkData = Object.values(loginUrl).filter((item) => item.env === setEnv)
    let loginDataSub = loginData[setEnv][0][`${user}`]
    let tagUser = loginDataSub.tag
    let covertUser = Buffer.from(
      `${loginDataSub.user}||${loginDataSub.password}`
    ).toString('base64')
    let login =
      linkData[0].link + ':' + linkData[0].port + '/callback?code=' + covertUser

    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      const currentTabsID = tabs.length === 0 ? 0 : tabs[0].id!
      let url = tabs[0].url
      let open = false
      if (url?.substring(0, 4) === 'http') {
        open = true
      }
      let sendToLogin = {
        action: 'login',
        role: tagUser,
        link: login,
        open: open
      }
      chrome.tabs.sendMessage(currentTabsID, sendToLogin, (response) => {
        if (!response) {
          window.open(login, '_blank')?.focus
        }
      })
    })
  }

  const ListLogin = () => {
    if (Object.values(loginData).length !== 0 && currentEnv !== '') {
      let arr = []
      let listUser = Object.keys(loginData[currentEnv][0])
      for (let i = 0; i < Object.keys(loginData[currentEnv][0]).length; i++) {
        arr.push(
          <button
            className="btn btn-sm w-[45%] m-1"
            key={i}
            onClick={() => openLogin(listUser[i], currentEnv)}>
            {listUser[i]}
          </button>
        )
      }
      return (
        <>
          <div className="flex flex-wrap justify-between p-2 mb-2 mt-3 border-2 rounded-md border-slate-900">
            {arr}
          </div>
        </>
      )
    }
  }

  return (
    <>
      <Header />
      <SelectorEnv />
      <ListLogin />
    </>
  )
}

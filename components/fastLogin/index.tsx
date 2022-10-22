import {useEffect} from 'react'

import useFillStore from '../../storage/loadFill'
import useLoadingStore from '../../storage/loadStatus'
import useLoginStore from '../../storage/loginData'
import {fetchFillData, fetchLoginData, fetchLoginUrl} from '../../utils/fetcher'
import AutoFill from './autofill'
import ListLogin from './listLogin'
import Loading from './loading'
import SelectorEnv from './selectorEnv'
import Title from './title'

export default function FastLogin() {
  const loginData = useLoginStore((state) => state.loginData)
  const loginUrl = useLoginStore((state) => state.loginUrl)
  const loadingState = useLoadingStore((state) => state.loadingStatus)
  const fillData = useFillStore((state) => state.fillData)
  const isLoginInLS =
    (loginData || loginUrl) &&
    (Object.keys(loginData).length === 0 || Object.keys(loginUrl).length === 0)

  useEffect(() => {
    try {
      if (isLoginInLS) {
        fetchLogin()
      }
    } catch (e) {
      useLoadingStore.getState().setLoadingStatus(false)
    }
  }, [])

  if (loadingState) {
    return <Loading Title={Title} />
  }

  const fetchLogin = () => {
    useLoadingStore.getState().setLoadingStatus(true)
    fetchLoginUrl().then((data) => {
      useLoginStore.getState().setLoginUrl(data)
      fetchLoginData().then((data) => {
        useLoadingStore.getState().setLoadingStatus(false)
        useLoginStore.getState().setLoginData(data)
        useLoginStore.getState().setCurrentEnv(Object.keys(data)[0])
        fetchFillData().then((data) => {
          useFillStore.getState().setFillData(data)
        })
      })
    })
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
      <AutoFill fillData={fillData} />
    </>
  )
}

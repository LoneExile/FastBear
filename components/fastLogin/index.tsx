import {useEffect, useState} from 'react'

import useLoginStore from '../../storage/loginData'
import {fetchUrl} from '../../utils/fetcher'

export default function FastLogin() {
  const [isLoading, setLoading] = useState(true)
  const loginData = useLoginStore((state) => state.loginData)

  useEffect(() => {
    setLoading(true)
    if (loginData && Object.keys(loginData).length === 0) {
      fetchUrl().then((data) => {
        useLoginStore.getState().setLoginData(data)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  if (isLoading) {
    return <progress className="progress w-96"></progress>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">🧸FastLogin</h1>
    </div>
  )
}

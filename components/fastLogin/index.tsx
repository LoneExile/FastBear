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
    return (
      <>
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

  return (
    <div>
      <h1 className="text-3xl font-bold">🧸FastLogin</h1>
    </div>
  )
}

import {useQuery} from '@tanstack/react-query'

import useLoadingStore from '../../storage/loadStatus'
import {fetchUrl} from '../../utils/fetcher'

export default function FastLogin() {
  const displayUrl = () => {
    const {data, status} = useQuery(['url'], fetchUrl)
    if (status === 'loading') {
      useLoadingStore.getState().setLoadingStatus('loading')
      return <div>Loading</div>
    }
    if (status === 'error') {
      useLoadingStore.getState().setLoadingStatus('error')
      return <div>Error</div>
    }
    if (status === 'success') {
      useLoadingStore.getState().setLoadingStatus('success')
      return <div>{data[0].env}</div>
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">🧸FastLogin</h1>
      {displayUrl()}
    </div>
  )
}

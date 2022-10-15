import create from 'zustand'
import {persist} from 'zustand/middleware'

interface LoadingProps {
  loadingStatus: string
  setLoadingStatus: (isLoading: string) => void
}
const useLoadingStore = create(
  persist<LoadingProps>((set) => ({
    loadingStatus: 'success',
    setLoadingStatus: (loadingStatus) =>
      set(() => ({loadingStatus: loadingStatus}))
  }))
)

export default useLoadingStore

import create from 'zustand'
import {persist} from 'zustand/middleware'

interface LoadingProps {
  loadingStatus: boolean
  setLoadingStatus: (isLoading: boolean) => void
}
const useLoadingStore = create(
  persist<LoadingProps>((set) => ({
    loadingStatus: false,
    setLoadingStatus: (loadingStatus) =>
      set(() => ({loadingStatus: loadingStatus}))
  }))
)

export default useLoadingStore

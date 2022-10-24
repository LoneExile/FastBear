import create from 'zustand'
import {persist} from 'zustand/middleware'

interface TabProps {
  tab: number
  setTab: (num: number) => void
  isToilet: boolean
  setIsToilet: (isToilet: boolean) => void
}
const useTabStore = create(
  persist<TabProps>((set) => ({
    tab: 1,
    setTab: (tab) => set(() => ({tab: tab})),
    isToilet: true,
    setIsToilet: (isToilet) => set(() => ({isToilet: isToilet}))
  }))
)

export default useTabStore

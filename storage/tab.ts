import create from 'zustand'
import {persist} from 'zustand/middleware'

interface TabProps {
  tab: number
  setTab: (num: number) => void
}
const useTabStore = create(
  persist<TabProps>((set) => ({
    tab: 1,
    setTab: (tab) => set(() => ({tab: tab}))
  }))
)

export default useTabStore

import create from 'zustand'
import {persist} from 'zustand/middleware'

interface UtilityProps {
  utilityData: object | undefined | null
  setUtilityData: (utilityData: object) => void
  toiletData: object | undefined | null
  setToiletData: (toilerData: object) => void
}
const useUtilityStore = create(
  persist<UtilityProps>((set) => ({
    utilityData: [],
    setUtilityData: (utilityData) => set(() => ({utilityData: utilityData})),
    toiletData: [],
    setToiletData: (toilerData) => set(() => ({toiletData: toilerData}))
  }))
)

export default useUtilityStore

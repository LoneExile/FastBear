import create from 'zustand'
import {persist} from 'zustand/middleware'

interface FillDataProps {
  fillData: object | undefined | null
  setFillData: (FillData: object) => void
}
const useFillStore = create(
  persist<FillDataProps>((set) => ({
    fillData: [],
    setFillData: (FillData) => set(() => ({fillData: FillData}))
  }))
)

export default useFillStore

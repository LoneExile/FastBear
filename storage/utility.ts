import create from 'zustand'
import {persist} from 'zustand/middleware'

interface UtilityProps {
  utilityData: object | undefined | null
  setUtilityData: (utilityData: object) => void
  toiletData: object | undefined | null
  setToiletData: (toilerData: object) => void
  toiletRoomSelected: object
  setToiletSelected: (toiletSelected: object) => void
  toiletAllRooms: object
  setToiletAllRooms: (toiletAllRooms: object) => void
}
const useUtilityStore = create(
  persist<UtilityProps>((set) => ({
    utilityData: [],
    setUtilityData: (utilityData) => set(() => ({utilityData: utilityData})),
    toiletData: [],
    setToiletData: (toilerData) => set(() => ({toiletData: toilerData})),
    toiletRoomSelected: {'2': true, '3': true},
    setToiletSelected: (toiletSelected) =>
      set(() => ({toiletRoomSelected: toiletSelected})),
    toiletAllRooms: [1, 2, 3],
    setToiletAllRooms: (toiletAllRooms) =>
      set(() => ({toiletAllRooms: toiletAllRooms}))
  }))
)

export default useUtilityStore

import create from 'zustand'
import {persist} from 'zustand/middleware'

interface LoginDataProps {
  loginData: object | undefined | null
  setLoginData: (loginData: object) => void
}
const useLoginStore = create(
  persist<LoginDataProps>((set) => ({
    loginData: [],
    setLoginData: (loginData) => set(() => ({loginData: loginData}))
  }))
)

export default useLoginStore

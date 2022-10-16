import create from 'zustand'
import {persist} from 'zustand/middleware'

interface LoginDataProps {
  loginData: object | undefined | null
  setLoginData: (loginData: object) => void
  loginUrl: object | undefined | null
  setLoginUrl: (loginUrl: object) => void
  currentEnv: string | undefined | null
  setCurrentEnv: (currentEnv: string) => void
}
const useLoginStore = create(
  persist<LoginDataProps>((set) => ({
    loginData: [],
    setLoginData: (loginData) => set(() => ({loginData: loginData})),
    loginUrl: [],
    setLoginUrl: (loginUrl) => set(() => ({loginUrl: loginUrl})),
    currentEnv: '',
    setCurrentEnv: (currentEnv) => set(() => ({currentEnv: currentEnv}))
  }))
)

export default useLoginStore

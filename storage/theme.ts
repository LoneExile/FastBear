import create from 'zustand'
import {persist} from 'zustand/middleware'

interface ThemeProps {
  theme: string
  setTab: (theme: string) => void
}

export const useThemeStore = create(
  persist<ThemeProps>((set) => ({
    theme: 'luxury',
    setTab: (theme) => set(() => ({theme: theme}))
  }))
)

export default useThemeStore

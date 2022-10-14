import create from 'zustand'

// import {useStorage} from '@plasmohq/storage/hook'

interface ThemeProps {
  theme: string
  setTab: (theme: string) => void
}

export const useThemeStore = create<ThemeProps>((set) => ({
  theme: 'luxury',
  setTab: (theme) => set(() => ({theme: theme}))
}))

export default useThemeStore

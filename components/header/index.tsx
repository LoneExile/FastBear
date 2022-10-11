import create from 'zustand'

interface TabProps {
  tab: number
  setTab: (num: number) => void
}

const useTabStore = create<TabProps>((set) => ({
  tab: 1,
  setTab: (tab) => set(() => ({tab: tab}))
}))

// // NOTE: this type with set state looks too complicated
// const tabStore = (set : (partial: TabProps | Partial<TabProps> | ((state: TabProps) => TabProps | Partial<TabProps>),
// replace?: boolean) => void) => ({
//   tab: 1,
//   setTab: (tab: number) => set(() => ({tab: tab}))
// })
// const useTabStore = create<TabProps>(tabStore)

const setTabEnv = (num: number) => {
  useTabStore.getState().setTab(num)
  // TODO: use old state when press again (use chrome api)
}

function classTab(num: number) {
  const tab = useTabStore((state) => state.tab)
  if (tab === num) {
    return 'tab tab-active tab-lifted'
  } else {
    return 'tab tab-lifted'
  }
}

function TabElement() {
  return (
    <>
      <a className={classTab(1)} onClick={() => setTabEnv(1)}>
        ⚡
      </a>
      <a className={classTab(2)} onClick={() => setTabEnv(2)}>
        🪄
      </a>
    </>
  )
}

export default TabElement

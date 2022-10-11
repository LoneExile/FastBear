import create from 'zustand'

// TODO: find this set type
const tabStore = (set: any) => ({
  tab: 1,
  setTab: (tab: number) => set(() => ({tab: tab}))
})

const useTabStore = create(tabStore)

const setTabEnv = (num: number) => {
  useTabStore.getState().setTab(num)
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

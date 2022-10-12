// import {useEffect} from 'react'
import create from 'zustand'

interface TabProps {
  tab: number
  setTab: (num: number) => void
}

const useTabStore = create<TabProps>((set) => ({
  tab: 1,
  setTab: (tab) => set(() => ({tab: tab}))
}))

// TODO: use old state when press again (use chrome api)
const setTabEnv = (num: number) => {
  useTabStore.getState().setTab(num)
  // chrome.storage.sync.set({storageTab: num})
}

function classTab(num: number) {
  const tab = useTabStore((state) => state.tab)
  if (tab === num) {
    return 'tab tab-active tab-lifted flex-1'
  } else {
    return 'tab tab-lifted flex-1'
  }
}

function TabElement() {
  return (
    <>
      <div className="flex w-full grid-flow-row grid-cols-12 items-center gap-0 overflow-y-hidden overflow-x-hidden px-[4px]">
        <a className={classTab(1)} onClick={() => setTabEnv(1)}>
          ⚡
        </a>
        <a className={classTab(2)} onClick={() => setTabEnv(2)}>
          🪄
        </a>
        <a className={classTab(0)} onClick={() => setTabEnv(0)}>
          🚀
        </a>
      </div>
    </>
  )
}

export default TabElement

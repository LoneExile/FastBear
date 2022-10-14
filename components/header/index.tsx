import create from 'zustand'

import {useStorage} from '@plasmohq/storage/hook'

interface TabProps {
  tab: number
  setTab: (num: number) => void
}

const useTabStore = create<TabProps>((set) => ({
  tab: 1,
  setTab: (tab) => set(() => ({tab: tab}))
}))

function TabElement() {
  const [tabNumber, setTabNumber] = useStorage<number>(
    'tab-number',
    (storedTab) => (typeof storedTab === 'undefined' ? 1 : storedTab)
  )

  const setTabEnv = (num: number) => {
    setTabNumber(num)
    useTabStore.getState().setTab(num)
  }

  function classTab(num: number) {
    const tab = typeof tabNumber !== 'undefined' ? tabNumber : 1
    // const tab = useTabStore((state) => state.tab)
    if (tab === num) {
      return 'tab tab-active tab-lifted flex-1'
    } else {
      return 'tab tab-lifted flex-1'
    }
  }

  return (
    <>
      <div className="flex w-full grid-flow-row grid-cols-12 items-center gap-0 overflow-y-hidden overflow-x-hidden px-[4px]">
        <a className={classTab(1)} onClick={() => setTabEnv(1)}>
          ⚡
        </a>
        <a className={classTab(2)} onClick={() => setTabEnv(2)}>
          🪄
        </a>
        <a className={classTab(3)} onClick={() => setTabEnv(3)}>
          🚀
        </a>
      </div>
    </>
  )
}

export default TabElement

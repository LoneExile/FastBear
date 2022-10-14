import useTabStore from '../../storage/tab'

function TabElement() {
  const setTabEnv = (num: number) => {
    useTabStore.getState().setTab(num)
  }

  function classTab(num: number) {
    const tab = useTabStore((state) => state.tab)

    if (tab === num) {
      return 'tab tab-active'
    } else {
      return 'tab'
    }
  }

  return (
    <>
      <div className="flex w-full grid-flow-row grid-cols-12 items-center gap-0 overflow-y-hidden overflow-x-hidden px-[4px] tabs tabs-boxed bg-opacity-100 mb-2">
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

import useTabStore from '../../storage/tab'

function TabElement() {
  const setTabEnv = (num: number) => {
    useTabStore.getState().setTab(num)
  }

  let spaceTab = 100 / 4

  function classTab(num: number) {
    const tab = useTabStore((state) => state.tab)

    if (tab === num) {
      return `tab tab-active text-opacity-100 font-bold m-auto w-[${spaceTab}%]`
    } else {
      return `tab text-opacity-100 m-auto w-[${spaceTab}%]`
    }
  }

  return (
    <>
      <div className="flex w-full grid-flow-row grid-cols-12 items-center gap-0 overflow-y-hidden overflow-x-hidden px-[4px] tabs tabs-boxed mb-2 bg-base-200">
        <a className={classTab(1)} onClick={() => setTabEnv(1)}>
          🚀
        </a>
        <a className={classTab(2)} onClick={() => setTabEnv(2)}>
          📜
        </a>
        <a className={classTab(4)} onClick={() => setTabEnv(4)}>
          🧰
        </a>
        <a className={classTab(5)} onClick={() => setTabEnv(5)}>
          📚
        </a>
      </div>
    </>
  )
}

export default TabElement

import useTabStore from '../../storage/tab'

function TabElement() {
  const setTabEnv = (num: number) => {
    useTabStore.getState().setTab(num)
  }

  let spaceTab = 100 / 5

  function classTab(num: number) {
    const tab = useTabStore((state) => state.tab)

    if (tab === num) {
      return `tab tab-active text-opacity-100 font-bold m-auto w-[${spaceTab}%]`
    } else {
      return `tab text-opacity-100 m-auto w-[${spaceTab}%]`
    }
  }

  const renderTab = (icon: string, id: number, isEable: boolean) => {
    if (isEable) {
      return (
        <a className={classTab(id)} onClick={() => setTabEnv(id)}>
          {icon}
        </a>
      )
    } else {
      return <></>
    }
  }

  return (
    <>
      <div className="flex w-full grid-flow-row grid-cols-12 items-center gap-0 overflow-y-hidden overflow-x-hidden px-[4px] tabs tabs-boxed mb-2 bg-base-200">
        {renderTab('🚀', 1, true)}
        {renderTab('📜', 2, true)}
        {renderTab(
          '🚻',
          3,
          // useTabStore((state) => state.isToilet)
          true
        )}
        {renderTab('🧰', 4, true)}
        {renderTab('📚', 5, true)}
      </div>
    </>
  )
}

export default TabElement

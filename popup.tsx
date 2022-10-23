import About from './components/about/index'
import FastFilling from './components/fastFilling/index'
import FastLogin from './components/fastLogin/index'
import FastSetting from './components/fastSetting/index'
import TabElement from './components/main/header'
// import useFillStore from './storage/loadFill'
import useTabStore from './storage/tab'
import {useThemeStore} from './storage/theme'

import './style.css'

function IndexPopup() {
  const theme = useThemeStore((state) => state.theme)
  const tab = useTabStore((state) => state.tab)

  const renderTab = () => {
    if (tab === 1) {
      return <FastLogin />
    } else if (tab === 2) {
      return <FastFilling />
    } else if (tab === 4) {
      return <FastSetting />
    } else if (tab === 5) {
      return <About />
    }
  }

  const renderContent = () => {
    return (
      <div
        data-theme={theme}
        className="w-[300px] h-[399px] p-[10px] overflow-y-hidden overflow-x-hidden">
        <TabElement />
        <div className="p-2 border-solid border-2 rounded-md border-primary-content h-[330px]">
          {renderTab()}
        </div>
      </div>
    )
  }

  return renderContent()
}

export default IndexPopup

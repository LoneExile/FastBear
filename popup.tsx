import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import About from './components/about/index'
import FastLogin from './components/fastLogin/index'
import FastSetting from './components/fastSetting/index'
import TabElement from './components/main/header'
import useTabStore from './storage/tab'
import {useThemeStore} from './storage/theme'

import './style.css'

const queryClient = new QueryClient()

function IndexPopup() {
  const theme = useThemeStore((state) => state.theme)
  const tab = useTabStore((state) => state.tab)

  const renderTab = () => {
    if (tab === 1) {
      return <FastLogin />
    } else if (tab === 2) {
      return <FastSetting />
    } else if (tab === 3) {
      return <About />
    }
  }

  const renderContent = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div
          data-theme={theme}
          className="w-[300px] h-[360px] p-[10px] overflow-y-hidden overflow-x-hidden">
          <TabElement />
          <div className="p-2 border-solid border-2 rounded-md border-slate-900 h-[285px]">
            {renderTab()}
          </div>
        </div>
      </QueryClientProvider>
    )
  }

  return renderContent()
}

export default IndexPopup

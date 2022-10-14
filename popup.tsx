import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

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
      return <FastSetting />
    }
  }

  return (
    <div data-theme={theme} className="w-[300px] h-[360px] p-[10px]">
      <TabElement />
      <div className="p-2 border-double border-4 rounded-md border-slate-900 h-[285px]">
        <QueryClientProvider client={queryClient}>
          {renderTab()}
        </QueryClientProvider>
      </div>
    </div>
  )
}

export default IndexPopup

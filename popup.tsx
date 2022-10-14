import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import FastLogin from './components/fastLogin/index'
import TabElement from './components/main/header'
import {useThemeStore} from './storage/theme'

import './style.css'

const queryClient = new QueryClient()

function IndexPopup() {
  const theme = useThemeStore((state) => state.theme)

  return (
    <div data-theme={theme} className="w-[300px] h-[360px] p-[10px]">
      <TabElement />
      <div className="p-2 border-double border-4 rounded-md border-slate-900 h-[285px]">
        <QueryClientProvider client={queryClient}>
          <FastLogin />
        </QueryClientProvider>
      </div>
    </div>
  )
}

export default IndexPopup

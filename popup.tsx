import TabElement from './components/header/index'
import Main from './components/main/index'

import './style.css'

function IndexPopup() {
  return (
    <div data-theme="luxury" className="w-[300px] h-[360px] p-[10px]">
      <TabElement />
      <div className="p-2 border-double border-4 rounded-md border-slate-500">
        <Main />
      </div>
    </div>
  )
}

export default IndexPopup

import Main from './components/main'

import './style.css'

function IndexPopup() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16
      }}>
      <Main />
      <progress className="progress w-56"></progress>
    </div>
  )
}

export default IndexPopup

import {useEffect} from 'react'

const AutoFill = () => {
  useEffect(() => {
    // TODO: check element/url before enable buttom autofill
    // TODO: ping check is vpn enable (ping?)
    // TODO: check user E-mail before render
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      const currentTabsID = tabs.length === 0 ? 0 : tabs[0].id!
      var url = tabs[0].url
      console.log('url', url)
      console.log('currentTabsID', currentTabsID)
      console.log('tabs status', tabs[0].status)
    })
  }, [])

  const keyfullFill = () => {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      const currentTabsID = tabs.length === 0 ? 0 : tabs[0].id!
      var fillMessage = {
        action: 'fillKeyFull',
        link: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Ours_brun_parcanimalierpyrenees_1.jpg',
        tabId: currentTabsID
      }
      chrome.tabs.sendMessage(currentTabsID, fillMessage, (response) => {
        console.log('Response from content: ', response)
      })
    })
  }

  return (
    <>
      <div
        id="autoFill"
        className="flex  mb-2 mt-0 border-double border-2 rounded-md border-slate-900">
        <button className="btn btn-sm  m-1.5" onClick={() => keyfullFill()}>
          📜 Fill data
        </button>
      </div>
    </>
  )
}

export default AutoFill

import shallow from 'zustand/shallow'

import useLoginStore from '../../storage/loginData'

const ListLogin = () => {
  const {loginData, loginUrl, currentEnv} = useLoginStore(
    (state) => ({
      loginData: state.loginData,
      loginUrl: state.loginUrl,
      currentEnv: state.currentEnv
    }),
    shallow
  )

  const openLogin = (user: string, setEnv: string) => {
    let linkData = Object.values(loginUrl).filter((item) => item.env === setEnv)
    let loginDataSub = loginData[setEnv][0][`${user}`]
    let tagUser = loginDataSub.tag
    let covertUser = Buffer.from(
      `${loginDataSub.user}||${loginDataSub.password}`
    ).toString('base64')
    let login =
      linkData[0].link + ':' + linkData[0].port + '/callback?code=' + covertUser

    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      const currentTabsID = tabs.length === 0 ? 0 : tabs[0].id!
      let url = tabs[0].url
      let open = false
      if (url?.substring(0, 4) === 'http') {
        open = true
      }
      let sendToLogin = {
        action: 'login',
        role: tagUser,
        link: login,
        open: open
      }
      chrome.tabs.sendMessage(currentTabsID, sendToLogin, (response) => {
        if (!response) {
          window.open(login, '_blank')?.focus
        }
      })
    })
  }

  if (Object.values(loginData).length !== 0 && currentEnv !== '') {
    let arr = []
    let listUser = Object.keys(loginData[currentEnv][0])
    for (let i = 0; i < Object.keys(loginData[currentEnv][0]).length; i++) {
      arr.push(
        <button
          className="btn btn-sm w-[45%] m-1"
          key={i}
          onClick={() => openLogin(listUser[i], currentEnv)}>
          {listUser[i].substring(0, 4)}
        </button>
      )
    }
    return (
      // TODO: fixed height position this border to max-height
      <>
        <div className="flex flex-wrap justify-between p-2 mb-2 mt-3 border-2 rounded-md border-primary-content h-[62%]">
          {arr}
        </div>
      </>
    )
  }
}

export default ListLogin

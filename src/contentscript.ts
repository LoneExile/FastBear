const createFile = async (url: string): Promise<File> => {
  let response = await fetch(url)
  let data = await response.blob()
  let metadata = {
    type: 'image/jpeg',
  }
  return new File([data], 'temp.jpg', metadata)
}
const fillData = async (imgLink : string) => {
  const designFile = await createFile(imgLink)
  const element: any = document.querySelectorAll('input.none-input-file')
  const dt = new DataTransfer()
  dt.items.add(designFile)
  for (var i = 0; i < element.length; i++) {
    element[i].files = dt.files
    const event = new Event('change', {
      bubbles: !0,
    })
    element[i].dispatchEvent(event)
  }
}

const clearLocal = (msg: any) => {
  var archive: any = {},
    keys = Object.keys(localStorage),
    i = keys.length
  while (i--) {
    archive[keys[i]] = localStorage.getItem(keys[i])
  }
  localStorage.clear()
  if(msg['open']){
    window.open(msg['link'], '_self')?.focus
  }
}

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  if (msg['action'] === 'login') {
    callback(msg['open'])
  } else if (msg['action'] === 'fillKeyFull') {
    fillData(msg['link'])
    // getText()
  } else if(msg === 'checkElement') {
    const element = document.querySelectorAll('input.none-input-file')
    callback(element.length > 0? true : false)
  } else {
    callback('good')
  }
})

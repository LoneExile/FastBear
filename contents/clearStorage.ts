const clearLocal = (msg: any) => {
  var archive: any = {},
    keys = Object.keys(localStorage),
    i = keys.length
  while (i--) {
    archive[keys[i]] = localStorage.getItem(keys[i])
  }
  localStorage.clear()
  if (msg['open']) {
    window.open(msg['link'], '_self')?.focus
  }
}

export default clearLocal

const createFile = async (url: string): Promise<File> => {
  let response = await fetch(url)
  let data = await response.blob()
  let metadata = {
    type: 'image/png'
  }
  return new File([data], 'temp.png', metadata)
}
const fillData = async (imgLink: string) => {
  // TODO: fix this type any
  const element: any = document.querySelectorAll('input.none-input-file')
  for (let i = 0; i < element.length; i++) {
    const designFile = await createFile(imgLink + `${i + 1}.png`)
    const dt = new DataTransfer()
    dt.items.add(designFile)
    element[i].files = dt.files
    const event = new Event('change', {
      bubbles: !0
    })
    element[i].dispatchEvent(event)
  }
}

export default fillData

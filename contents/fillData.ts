const createFile = async (url: string): Promise<File> => {
  let response = await fetch(url)
  let data = await response.blob()
  let metadata = {
    type: 'image/jpeg'
  }
  return new File([data], 'temp.jpg', metadata)
}
const fillData = async (imgLink: string) => {
  const designFile = await createFile(imgLink)
  const element: any = document.querySelectorAll('input.none-input-file')
  const dt = new DataTransfer()
  dt.items.add(designFile)
  for (var i = 0; i < element.length; i++) {
    element[i].files = dt.files
    const event = new Event('change', {
      bubbles: !0
    })
    element[i].dispatchEvent(event)
  }
}

export default fillData

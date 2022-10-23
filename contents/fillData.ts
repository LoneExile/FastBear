const createFile = async (url: string): Promise<File> => {
  let response = await fetch(url)
  let data = await response.blob()
  let metadata = {
    type: 'image/png'
  }
  return new File([data], 'temp.png', metadata)
}

const fillData = async (msg: Object) => {
  const fillObj = msg['fillData']
  const boxImg: any = document.querySelectorAll('input[type="file"]')

  for (let i = 0; i < fillObj.length; i++) {
    if (fillObj[i]['type'] !== "img" && fillObj[i]['type'] !== "buttom") {
      var input = (<HTMLInputElement>document.querySelector(`[${fillObj[i]['element']}]`))
      var inputAll: any = (document.querySelectorAll(`[${fillObj[i]['element']}]`))[1]
      const isDisable = input?.disabled
      if (!isDisable) {

        if (inputAll && fillObj[i]['type'] === "text") {
          inputAll.value = fillObj[i]['input']
        }

        if (fillObj[i]['type'] === "check-box") {
          if (fillObj[i]['input'] === true) {
            input.checked = true
          }
        } else if (fillObj[i]['type'] === "radio") {
          console.log('radio')
        } else if (fillObj[i]['type'] === "text-extra") {
          input.value = fillObj[i]['input']
          input.dispatchEvent(new Event('input'))
          input.dispatchEvent(new Event('change'))
          input.dispatchEvent(new KeyboardEvent('keyup'))
        } else if (fillObj[i]['type'] === "dropdown") {
          // TODO: fix type any
          if (fillObj[i]['input'] !== "") {
            var elementDropdown = Array.prototype.slice.call(input).filter((el: any) => { return el.textContent.trim() === fillObj[i]['input'] })[0]
            input.value = elementDropdown.value
          }
        } else {
          input.value = fillObj[i]['input']
        }
        // input.value = ''
      }
    }

    if (fillObj[i]['type'] === "button") {
      const buttonEle: any = document.querySelectorAll(`${fillObj[i]['element']}`)
      var elementDropdown = Array.prototype.slice.call(buttonEle).filter((el: any) => {
        return el.innerText === fillObj[i]['input']
      })
      console.log(elementDropdown)
      elementDropdown[0].click()
    }


    if (fillObj[i]['type'] === "img") {
      const imgNum = fillObj[i]['input']
      const designFile = await createFile(msg['link'] + `${imgNum}.png`)
      const dt = new DataTransfer()
      dt.items.add(designFile)
      boxImg[imgNum - 1].files = dt.files
      const event = new Event('change', {
        bubbles: !0
      })
      boxImg[imgNum - 1].dispatchEvent(event)
    }
  }
}

export default fillData

const getText = () => {
    // const tag = document.querySelector("[id='SIvCob']") as HTMLSpanElement

    // var inputValue = (<HTMLCollectionOf<any>>document.getElementsByClassName('gLFyf gsfi'))
    // console.log("this is", inputValue[0].value);
    // inputValue[0].value = 'Dude!'

    // return tag?.innerText ?? "No data"
    // return "good job"
    console.log('good job')
}

const createFile = async (url: string): Promise<File> => {
    let response = await fetch(url)
    let data = await response.blob()
    let metadata = {
        type: 'image/jpeg',
    }
    return new File([data], 'temp.jpg', metadata)
}
const fillData = async () => {
    // if (true) {
    const designFile = await createFile(
        'https://upload.wikimedia.org/wikipedia/commons/9/9e/Ours_brun_parcanimalierpyrenees_1.jpg'
    )
    // find the file input element and trigger an upload
    // const input = document.querySelector('input.none-input-file') as HTMLInputElement;
    const element: any = document.querySelectorAll('input.none-input-file')
    // const dt = new DataTransfer();
    // dt.items.add(designFile);
    // input.files = dt.files;

    // const event = new Event("change", {
    //     bubbles: !0
    // });
    // input.dispatchEvent(event)
    const dt = new DataTransfer()
    dt.items.add(designFile)
    for (var i = 0; i < element.length; i++) {
        element[i].files = dt.files
        const event = new Event('change', {
            bubbles: !0,
        })
        element[i].dispatchEvent(event)
    }
    // }
}

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
    console.log(msg)
    // getText()
    fillData()
    // callback(`text is : ${getText()}`)
    callback('a')
})

const createFile = async (url: string): Promise<File> => {
    let response = await fetch(url)
    let data = await response.blob()
    let metadata = {
        type: 'image/jpeg',
    }
    return new File([data], 'temp.jpg', metadata)
}
const fillData = async () => {
    const designFile = await createFile(
        'https://upload.wikimedia.org/wikipedia/commons/9/9e/Ours_brun_parcanimalierpyrenees_1.jpg'
    )
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
    window.open(msg['link'], '_self')?.focus
    return archive
}

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
    if (msg['action'] === 'login') {
        var whatReturn = clearLocal(msg)
        var store = whatReturn['store']
        var currentRole = JSON.parse(store)['profile'].role
        if (msg['role'] !== currentRole) {
            whatReturn = clearLocal(msg)
        }
    }
    if (msg === 'fillData') {
        fillData()
    }
    callback('good')
})

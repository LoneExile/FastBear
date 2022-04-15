const getText = () => {
    const tag = document.querySelector("[id='SIvCob']") as HTMLSpanElement
    
    var inputValue = (<HTMLCollectionOf<any>>document.getElementsByClassName('gLFyf gsfi'))
    console.log("this is", inputValue[0].value);
    inputValue[0].value = 'Dude!'
    
    return tag?.innerText ?? "No data"
}

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
    // console.log("message received from sender", sender.id, msg);
    callback(`text is : ${getText()}`)
})
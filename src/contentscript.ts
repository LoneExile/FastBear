const getText = () => {
    const tag = document.querySelector("[id='SIvCob']") as HTMLSpanElement
    return tag?.innerText ?? "No data"
}

// console.log(getText());

chrome.runtime.onMessage.addListener((msg, sender, callback) => {
    // console.log("message received from sender", sender.id, msg);
    callback(`text is : ${getText()}`)
})
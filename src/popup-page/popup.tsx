import React, {FC, useEffect, useState} from "react"
import * as ReactDOMClient from 'react-dom/client';

interface IProps {

}

export const Popup: FC<IProps> = () => {

    const [content, setContent] = useState('N/A')

    useEffect(() => {
        chrome.tabs.query({currentWindow: true, active: true}, tabs => {
            const currentTabsID = tabs.length === 0 ? 0 : tabs[0].id!
            chrome.tabs.sendMessage(currentTabsID, 'xoxo', response => {
                console.log("Response from content: ", response);
                setContent(response)
            }) 
        })
    }, [])

   return (
       <div>
           <h1>Hello</h1>
           <p>this is a popup TS.</p>
           {content}
       </div>
   ) 
}

// render(<Popup />, document.getElementById("react-target"))

const container = document.getElementById("react-target")
const root = ReactDOMClient.createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<Popup />);
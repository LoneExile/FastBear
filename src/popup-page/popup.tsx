import React, {FC} from "react"
import * as ReactDOMClient from 'react-dom/client';

interface IProps {

}

export const Popup: FC<IProps> = () => {
   return (
       <div>
           <h1>Hello</h1>
           <p>this is a popup TS.</p>
       </div>
   ) 
}

// render(<Popup />, document.getElementById("react-target"))

const container = document.getElementById("react-target")
const root = ReactDOMClient.createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<Popup />);
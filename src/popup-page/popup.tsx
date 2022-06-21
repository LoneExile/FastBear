import React, { FC, useEffect, useState } from "react"
import * as ReactDOMClient from 'react-dom/client';

interface IProps {

}

export const Popup: FC<IProps> = () => {
    const [isLoading, setLoading] = useState(true);
    const [selectEnv, setSelectEnv] = useState([{ id: 0, value: 'loading...', label: 'loading...' }])
    const [selectOptions, setSelectOptions] = useState('N/A')
    const [dataLogin, setDataLogin] = useState<any>({})
    const [dataUrl, setDataUrl] = useState([{ env: '', link: '' }])
    var options: {
        id: number;
        value: string;
        label: string;
    }[] = [];
    useEffect(() => {
        chrome.storage.sync.get(['storageUrl'], function (result) {
            console.log(result.storageUrl?.length);
            if (result.storageUrl?.length === 0) {
                fetchUrl()
            } else {
                setDataUrl(result.storageUrl)
            }
        })
        chrome.storage.sync.get(['key'], function (result) {
            if ((Object.keys(result.key)?.length === 0)) {
                console.log(Object.keys(result.key)?.length);
                fetchLoin()
                fetchUrl()
            } else {
                setDataLogin(result.key)
                var dataSplit = Object.keys(result.key)
                for (var i = 0; i < dataSplit.length; i++) {
                    var obj: any = []
                    obj['id'] = i
                    obj['value'] = dataSplit[i];
                    obj['label'] = dataSplit[i];
                    options.push(obj);
                }

                setSelectEnv(options)
                setSelectOptions(options[0].value)
                setLoading(false);
            }
        });

    }, [])


    function fetchUrl() {
        setLoading(true);
        fetch(`https://script.google.com/a/macros/turbo.co.th/s/AKfycbwrHopTUhypSU_P0o0YxDRtScUmPbMA5ao4QeRm7oJGPr5RFYC2vinE1XwOfXiepFztyA/exec?action=url`, {
        })
            .then(res => {
                // return res.clone().text()
                return res.clone().json()
            })
            .then(data => {
                setDataUrl(data)
                chrome.storage.sync.set({ storageUrl: data });
            })
            .then(() => {
                // setLoading(false);
            })
            .catch(error => {
                // console.log(error)
            })
    }
    function fetchLoin() {
        setLoading(true);
        fetch(`https://script.google.com/a/macros/turbo.co.th/s/AKfycbwrHopTUhypSU_P0o0YxDRtScUmPbMA5ao4QeRm7oJGPr5RFYC2vinE1XwOfXiepFztyA/exec?action=login`, {
        })
            .then(res => {
                // return res.clone().text()
                return res.clone().json()
            })
            .then(data => {
                setDataLogin(data)
                chrome.storage.sync.set({ key: data });
                var dataSplit = Object.keys(data)
                for (var i = 0; i < dataSplit.length; i++) {
                    var obj: any = []
                    obj['id'] = i
                    obj['value'] = dataSplit[i];
                    obj['label'] = dataSplit[i];
                    options.push(obj);
                }
                setSelectEnv(options)
                setSelectOptions(options[0].value)
            })
            .then(() => {
                setLoading(false);
            })
            .catch(error => {
                console.log(error)
            })
    }

    function keyfullFill(): void {
        chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
            const currentTabsID = tabs.length === 0 ? 0 : tabs[0].id!
            chrome.tabs.sendMessage(currentTabsID, 'fillKeyFull', response => {
                console.log("Response from content: ", response);
                // setContent(response)
            })
        })
    }

    const setLoginEnv = (event: any) => {
        setSelectOptions(event.target.value)
    };

    function buildOptions() {
        var arr = [];
        for (let i = 0; i < selectEnv?.length; i++) {
            arr.push(<option key={selectEnv[i]?.id} value={selectEnv[i]?.value}>{selectEnv[i]?.label}</option>)
        }
        return arr;
    }
    if (isLoading) {
        return (<div>Loading...</div>)
    }

    function openLogin(user: string, setEnv: string) {
        var linkData = dataUrl.filter(data => data.env === setEnv)
        var loginData = dataLogin[setEnv][0][`${user}`]
        var login = linkData[0].link + btoa(`${loginData.user}||${loginData.password}`)
        localStorage.clear();
        window.open(login, '_blank')?.focus
    }

    function FastLogin() {
        var listUser = Object.keys(dataLogin[selectOptions][0])
        var arr = [];

        for (let i = 0; i < Object.keys(dataLogin[selectOptions][0]).length; i++) {
            arr.push(<button key={i} onClick={() => openLogin(listUser[i], selectOptions)}>{listUser[i]}</button>)
        }
        return <>
            <h2>🐻‍❄️ FAST LOGIN ⚡</h2>
            <select onChange={setLoginEnv} value={selectOptions}>
                {buildOptions()}
            </select>
            <button onClick={() => updateData()}>Update Data</button>
            <hr />
            {arr}
            <hr />
        </>
    }

    function updateData() {
        fetchLoin()
        fetchUrl()
    }

    function AutoFill() {
        return <>
            <h2>📜 AUTO FILL 🖋️</h2>
            <div id="autoFill">
                <button onClick={() => keyfullFill()}>กรอกข้อมูลหน้านี้</button>
            </div>
            <hr />
        </>
    }

    function Footer() {
        return <>
            <button onClick={() => window.open('https://docs.google.com/spreadsheets/d/145kRQWOOM7hlUR9npr42-ST-TfABZFFOOGzgCnU5ZmE/edit?usp=sharing', '_blank')?.focus}>🛠️ Setting </button>
            <button onClick={() => window.open('http://git.ntbx.tech/apinant.u-s/icebear-tester-extension/-/issues', '_blank')?.focus} >🤔 พบปัญหาในการใช้งาน</button>

        </>
    }

    return (
        <>
            <FastLogin />
            <AutoFill />
            <Footer />
        </>
    )
}

const container = document.getElementById("react-target")
const root = ReactDOMClient.createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<Popup />);
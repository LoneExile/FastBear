import React, { FC, useEffect, useState } from "react"
import * as ReactDOMClient from 'react-dom/client';
import "./popup.css"

interface IProps {

}

export const Popup: FC<IProps> = () => {
    const [isLoading, setLoading] = useState(true);
    const [selectEnv, setSelectEnv] = useState([{ id: 0, value: 'loading...', label: 'loading...' }])
    const [selectOptions, setSelectOptions] = useState('')
    const [dataLogin, setDataLogin] = useState<any>({})
    const [dataUrl, setDataUrl] = useState([{ env: '', link: '' }])
    const [theme, setTheme] = useState(false)
    var options: {
        id: number;
        value: string;
        label: string;
    }[] = [];
    const baseApiURL = 'https://script.google.com/a/macros/turbo.co.th/s/AKfycbxY-HwRXrZ9XN8yVF8fDertRwiL2uFUjz2IDVk1cnfvJPgXRGwRI0YtEGzvaiLyf6zBBQ/exec'
    useEffect(() => {
        chrome.storage.sync.get(['storageTheme'], function (result) {
            if (result.storageTheme) {
                setTheme(result.storageTheme)
            } else {
                chrome.storage.sync.set({ storageTheme: false });
                setTheme(false)
            }
        })
        chrome.storage.sync.get(['storageUrl'], function (result) {
            if (result.storageUrl?.length === 0) {
                fetchUrl()
            } else {
                setDataUrl(result.storageUrl)
            }
        })
        chrome.storage.sync.get(['storageLogin'], function (result) {
            if ((Object.keys(result?.storageLogin == null || undefined ? {} : result.storageLogin)?.length === 0)) {
                fetchLoin()
                fetchUrl()
            } else {
                setDataLogin(result.storageLogin)
                var dataSplit = Object.keys(result.storageLogin)
                for (var i = 0; i < dataSplit.length; i++) {
                    var obj: any = []
                    obj['id'] = i
                    obj['value'] = dataSplit[i];
                    obj['label'] = dataSplit[i];
                    options.push(obj);
                }
                setSelectEnv(options)
                StorageCurrentSelected()
            }
        });

    }, [])

    function StorageCurrentSelected() {
        chrome.storage.sync.get(['currentSelected'], function (result) {
            if (result?.currentSelected === undefined || null || '') {
                chrome.storage.sync.set({ currentSelected: options[0].value });
                setSelectOptions(options[0].value)
            } else {
                setSelectOptions(result.currentSelected)
            }
            setLoading(false);
        })
    }

    function fetchUrl() {
        setLoading(true);
        fetch(`${baseApiURL}?action=url`, {
        })
            .then(res => {
                return res.clone().json()
            })
            .then(data => {
                setDataUrl(data)
                chrome.storage.sync.set({ storageUrl: data });
            })
    }
    function fetchLoin() {
        setLoading(true);
        fetch(`${baseApiURL}?action=login`, {
        })
            .then(res => {
                // return res.clone().text()
                return res.clone().json()
            })
            .then(data => {
                setDataLogin(data)
                chrome.storage.sync.set({ storageLogin: data });
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
                window.open('https://www.google.com/accounts/AccountChooser?hd=turbo.co.th', '_blank')?.focus
            })
    }

    function keyfullFill(): void {
        chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
            const currentTabsID = tabs.length === 0 ? 0 : tabs[0].id!
            chrome.tabs.sendMessage(currentTabsID, 'fillKeyFull', response => {
                console.log("Response from content: ", response);
            })
        })
    }

    const setLoginEnv = (event: any) => {
        setSelectOptions(event.target.value)
        chrome.storage.sync.set({ currentSelected: event.target.value });
    };

    const setThemeEnv = () => {
        setTheme(!theme)
        chrome.storage.sync.set({ storageTheme: !theme });
    }

    function buildOptions() {
        var arr = [];
        for (let i = 0; i < selectEnv?.length; i++) {
            arr.push(<option key={selectEnv[i]?.id} value={selectEnv[i]?.value}>{selectEnv[i]?.label}</option>)
        }
        return arr;
    }
    if (isLoading) {
        // return (<progress className="progress w-96"></progress>)
        return (<>
            <figure><img src="./images/bear-dance.gif" alt="Shoes" /></figure>
            <progress className="progress w-96"></progress>
        </>
        )
    }

    function openLogin(user: string, setEnv: string) {
        var linkData = dataUrl.filter(data => data.env === setEnv)
        var loginData = dataLogin[setEnv][0][`${user}`]
        var tagUser = loginData.tag
        var login = linkData[0].link + btoa(`${loginData.user}||${loginData.password}`)
        var sendToLogin = { action: 'login', role: tagUser, link: login }
        chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
            const currentTabsID = tabs.length === 0 ? 0 : tabs[0].id!
            chrome.tabs.sendMessage(currentTabsID, sendToLogin, response => {
                // console.log("Response from content: ", JSON.parse(response)['profile'].role);
            })
        })
    }



    function FastLogin() {
        var listUser = Object.keys(dataLogin[selectOptions][0])
        var arr = [];
        for (let i = 0; i < Object.keys(dataLogin[selectOptions][0]).length; i++) {
            arr.push(<button className="btn btn-sm w-32 m-1" key={i} onClick={() => openLogin(listUser[i], selectOptions)}>{listUser[i]}</button>)
        }
        return <>
            <h2 className={!theme ? "card-title mb-1" : "card-title mb-1 text-white"}>🐻‍❄️ FAST LOGIN ⚡</h2>
            <div className="">
                <select className="select select-info select-sm max-w-xs w-32 m-1 mb-2" onChange={setLoginEnv} value={selectOptions}>
                    {buildOptions()}
                </select>
                <button className="btn btn-xs w-32 " onClick={() => updateData()}>📥 Update Data</button>
            </div>
            <div className="flex flex-wrap justify-between mb-2 mt-0 border-double border-2 rounded-md border-slate-500">
                {arr}
            </div>
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
                <button disabled onClick={() => keyfullFill()}>Fill data this page</button>
            </div>
            <hr />
        </>
    }

    function Footer() {
        return <>
            <button className="btn btn-xs  mr-1" onClick={() => window.open('https://docs.google.com/spreadsheets/d/145kRQWOOM7hlUR9npr42-ST-TfABZFFOOGzgCnU5ZmE/edit?usp=sharing', '_blank')?.focus}>🛠️ Setting </button>
            <button className="btn btn-xs  mr-1" onClick={() => window.open('http://git.ntbx.tech/apinant.u-s/icebear-tester-extension/-/issues', '_blank')?.focus} >🤔 having an issue?</button>
            <button className="btn btn-xs" onClick={() => setThemeEnv()}>{theme ?
                <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg> :
                <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
            }</button>

        </>
    }

    return (
        <>
            <div className={theme ? 'bg-gradient-to-r from-pink-500 to-blue-500' : 'bg-base-100 shadow-xl'}>
                <div className="p-2 border-double border-4 rounded-md border-slate-500">
                    <FastLogin />
                    <div className="flex justify-between">
                        {/* <AutoFill /> */}
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

const container = document.getElementById("react-target")
const root = ReactDOMClient.createRoot(container!);
root.render(<Popup />);
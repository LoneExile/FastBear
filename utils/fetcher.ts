import {ScriptUrl} from './enum'

async function fetchUrl() {
  const url = ScriptUrl.BaseUrl + ScriptUrl.ApiKey + ScriptUrl.getLoginUrl
  const res = await fetch(url, {})
  return res.clone().json()
}

export {fetchUrl}

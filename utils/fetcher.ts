import {ScriptUrl as S} from './enum'

async function fetchLoginUrl() {
  const url = S.BaseUrl + S.ApiKey + S.GetLoginUrl + S.IdSheetLogin
  const res = await fetch(url, {})
  return res.clone().json()
}

async function fetchLoginData() {
  const url = S.BaseUrl + S.ApiKey + S.GetLoginData + S.IdSheetLogin
  const res = await fetch(url, {})
  return res.clone().json()
}

async function fetchFillData() {
  const url = S.BaseUrl + S.ApiKey + S.GetFillData + S.IdSheetLogin
  const res = await fetch(url, {})
  return res.clone().json()
}

async function fetchUtilsUrl() {
  const url = S.BaseUrl + S.ApiKey + S.GetUtilsUrl + S.IdSheetLogin
  const res = await fetch(url, {})
  return res.clone().json()
}

export {fetchLoginUrl, fetchLoginData, fetchFillData, fetchUtilsUrl}

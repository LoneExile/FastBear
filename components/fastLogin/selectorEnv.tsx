import useLoginStore from '../../storage/loginData'
import {SheetUrl as S} from '../../utils/enum'

export default function SelectorEnv() {
  const loginUrl = useLoginStore((state) => state.loginUrl)

  const buildOptions = () => {
    var arr = []
    for (let i = 0; i < Object.values(loginUrl).length; i++) {
      arr.push(
        // TODO: limit characters to display
        <option key={i} value={loginUrl[i].env}>
          {loginUrl[i].env.toUpperCase()}
        </option>
      )
    }
    return arr
  }

  const setEnv = (event: React.ChangeEvent<HTMLSelectElement>) => {
    useLoginStore.getState().setCurrentEnv(event.target.value)
  }

  const dropDownEnv = () => {
    // TODO: make selector box bigger, so can display more characters
    // TODO: add fuction button Update to reload login data
    return (
      <div className="flex w-[100%] h-[20%] mt-[2%] item-center px-[2%]">
        <select
          className="select select-info border-2 w-[45%]"
          onChange={setEnv}
          value={useLoginStore((state) => state.currentEnv)}>
          {buildOptions()}
        </select>
        <div className="ml-auto w-[45%] my-auto">
          <button
            className="tooltip btn btn-outline border-2 btn-sm font-bold mr-[10%]"
            data-tip="Update">
            📥
          </button>
          <button
            className="tooltip btn btn-outline border-2 btn-sm font-bold"
            data-tip="Edit"
            onClick={() => window.open(S.LoginData, '_blank')?.focus}>
            📝
          </button>
        </div>
      </div>
    )
  }

  const selector = () => {
    return (
      <>
        <div className="flex flex-wrap justify-between mt-2">
          {dropDownEnv()}
        </div>
      </>
    )
  }

  return selector()
}

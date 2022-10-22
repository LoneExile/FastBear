import {useThemeStore} from '../../storage/theme'
import {AllTheme} from '../../utils/enum'

let allTheme = Object.values(AllTheme).filter(
  (item) => typeof item !== 'number'
)

export default function FastLogin() {
  const setTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    useThemeStore.getState().setTab(event.target.value)
  }

  const buildOptions = () => {
    var arr = []
    for (let i = 0; i < allTheme.length; i++) {
      arr.push(
        <option key={i} value={allTheme[i]}>
          {allTheme[i]}
        </option>
      )
    }
    return arr
  }

  // TODO: Alert toilet

  const dropDownTheme = () => {
    return (
      <div className="">
        <div className="badge badge-accent m-auto ml-1">Theme</div>
        <select
          className="select select-info m-1 ml-[45px]"
          onChange={setTheme}
          value={useThemeStore((state) => state.theme)}>
          {buildOptions()}
        </select>
      </div>
    )
  }

  return (
    <div className="h-[300px]">
      <h2 className="text-3xl font-bold border-2 rounded-md text-center bg-secondary border-transparent">
        Setting
      </h2>
      <div className="flex flex-wrap justify-between h-[230px] mt-2">
        {dropDownTheme()}
      </div>
    </div>
  )
}

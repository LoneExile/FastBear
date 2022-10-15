import {useThemeStore} from '../../storage/theme'

const allTheme = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter'
]

export default function FastLogin() {
  const setTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    useThemeStore.getState().setTab(event.target.value)
  }

  function buildOptions() {
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
      <h2 className="text-3xl font-bold underline">⚙Setting</h2>
      <div className="flex flex-wrap justify-between h-[230px] mt-2">
        {dropDownTheme()}
      </div>
    </div>
  )
}

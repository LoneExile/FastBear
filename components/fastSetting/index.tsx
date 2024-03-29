import {useEffect, useState} from 'react'

import useTabStore from '../../storage/tab'
import {useThemeStore} from '../../storage/theme'
import {AllTheme} from '../../utils/enum'

let allTheme = Object.values(AllTheme).filter(
  (item) => typeof item !== 'number'
)

export default function FastLogin() {
  // const isToilet = useTabStore((state) => state.isToilet)

  const setTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // useTabStore.getState().setTab(4)
    useThemeStore.getState().setTab(event.target.value)

    // WARN: Hmmmmmmm
    location.reload()
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

  const DropDownTheme = () => {
    return (
      <div className="">
        <div className="badge badge-accent m-auto ml-1">Theme</div>
        <select
          className="select select-info m-1 ml-[45px]"
          onChange={(e) => {
            e.preventDefault()
            setTheme(e)
          }}
          value={useThemeStore((state) => state.theme)}>
          {buildOptions()}
        </select>
      </div>
    )
  }

  // FIX: This, I don't like it
  // BUG: cuase alot of rerender? see in extension error
  // use chrome storage to store theme instead?
  // const setToiletTab = () => {
  //   useTabStore.getState().setIsToilet(!isToilet)
  //   window.close()
  // }

  return (
    <>
      <div className="">
        <h2 className="text-3xl text-primary-content font-bold border-2 rounded-md text-center bg-secondary border-transparent">
          Setting
        </h2>
        <div className="flex flex-wrap justify-between mt-2">
          <DropDownTheme />
        </div>
        {/*
        <div className="form-control">
          <label className="label flex justify-between">
            <div className="badge badge-secondary">Toilet API</div>
            <input
              type="checkbox"
              className="checkbox checkbox-secondary m-auto"
              checked={isToilet}
              onChange={() => setToiletTab()}
            />
          </label>
        </div>
        */}
      </div>
    </>
  )
}

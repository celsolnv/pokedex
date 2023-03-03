import { Dispatch, SetStateAction } from 'react'
import { ITabActive } from '.'

interface ITabItem {
  title: ITabActive
  tabActive: ITabActive
  setTabActive: Dispatch<SetStateAction<ITabActive>>

}
export const TabItem = ({ title, tabActive, setTabActive }: ITabItem): JSX.Element => (
  <li className="mr-1" onClick={() => { setTabActive(title) }}>
    <a
      className={`tab-index-pokemon capitalize cursor-pointer hover:scale-110
      ${tabActive === title && 'tab-index-pokemon-active'} `} >{title}</a>
  </li>
)

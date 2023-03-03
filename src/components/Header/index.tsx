import { useNavigate } from 'react-router-dom'
import { MdFavorite } from 'react-icons/md'

export function Header (): JSX.Element {
  const navigate = useNavigate()
  return (
    <header
      className="bg-red-700 mx-auto flex items-center justify-center p-4 lg:px-8 relative">
      <img onClick={() => { navigate('/') }} className='m-auto absolute' src='assets/images/logo-pokedex.png' alt="logo do pokemon" />
      <MdFavorite color='#FA8072' onClick={() => { navigate('/favorites') }} className='ml-auto' size={40}/>
    </header>
  )
}

import './style.css'
import { BiArrowBack } from 'react-icons/bi'
// import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { MdFavorite } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export default function DetailsPokemon (): JSX.Element {
  const navigate = useNavigate()
  return (
    <div className="container">
      <div className='p-4'>

        <nav className='flex items-center justify-between flex-wrap mb-3 mt-4'>
          <BiArrowBack size={24} onClick={() => { navigate('/') }} />
          <MdFavorite size={24} />
        </nav>

        <div className="flex justify-between items-center ">
          <div>
            <h2 className="font-bold text-4xl">Bulbasaur</h2>
            <div className="flex flex-wrap">
              <div className='pr-1'>
                <div className="type-pokemon capitalize ">
                  <p className='text-base' >grass</p>
                </div>
              </div>
              <div className='pr-1' >
                <div className="type-pokemon capitalize ">
                  <p className='text-base'>poison</p>
                </div>
              </div>
            </div>
          </div>
          <div className='pb-3'>
            <p className='text-sm font-bold'>#001</p>
          </div>

        </div>

        <div className='flex w-full justify-center pt-5'>
          <div className="w-40">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="" />
          </div>
        </div>
      </div>
      <div className="h-full w-full attribute bg-white text-black rounded-lg z-10 p-2 ">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-1">
              <a href="#" className="tab-index-pokemon border-blue-600   text-blue-600 border-b-2" >About</a>
            </li>
            <li className="mr-1">
              <a href="#" className="tab-index-pokemon" >Base Stats</a>
            </li>
            <li className="mr-1">
              <a href="#" className="tab-index-pokemon" >Evolution</a>
            </li>
            <li className="mr-1">
              <a href="#" className="tab-index-pokemon" >Moves</a>
            </li>
          </ul>
        </div>

        <div>
          <div className='grid grid-cols-2 m-3'>
            <p>Species</p>
            <p>Spedd</p>
          </div>
          <div className='grid grid-cols-2 m-3'>
            <p>Height</p>
            <p>2 - 4,6 (0,70cm)</p>
          </div>
          <div className='grid grid-cols-2 m-3'>
            <p>Weight</p>
            <p>15.2Lbs (6,9 Kg)</p>
          </div>
          <div className='grid grid-cols-2 m-3'>
            <p>Abilities</p>
            <p>OverGrow, Chlorophyl </p>
          </div>
        </div>
      </div>

    </div>
  )
}

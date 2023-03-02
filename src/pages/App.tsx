import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './Home'
import Pokemon from './Pokemon/DetailsPokemon'
import { PokemonContextProvider } from '../context/PokemonContext'

export default function App (): JSX.Element {
  return (
    <BrowserRouter>
      <PokemonContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pokemon/:name' element={<Pokemon />} />
        </Routes>
      </PokemonContextProvider>
    </BrowserRouter>
  )
}

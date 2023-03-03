import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './Home'
import Pokemon from './Pokemon/DetailsPokemon'
import PokemonsFavorites from './PokemonFavorite/index'
import { PokemonContextProvider } from '../context/PokemonContext'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function App (): JSX.Element {
  const queryClient = new QueryClient()

  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>

      <PokemonContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pokemon/:name' element={<Pokemon />} />
          <Route path='/favorites' element={<PokemonsFavorites />} />
        </Routes>
      </PokemonContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { DetailsPokemon, Home, PokemonFavorite } from '@/pages/index'
import { PokemonContextProvider } from '@/context/PokemonContext'

export default function App (): JSX.Element {
  const queryClient = new QueryClient()

  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <PokemonContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pokemon/:name' element={<DetailsPokemon />} />
          <Route path='/favorites' element={<PokemonFavorite />} />
        </Routes>
      </PokemonContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

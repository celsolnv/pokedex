import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './Home'
import Pokemon from './Pokemon/DetailsPokemon'

export default function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/pokemon' element={<Pokemon/>}/>
      </Routes>
    </BrowserRouter>
  )
}

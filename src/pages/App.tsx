import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './Home'

export default function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

import './App.css'
import Header from './components/Header.tsx'
import { Route, Routes } from 'react-router'
import Characters from './pages/Characters.tsx'
import Home from './pages/Home.tsx'
import CharacterPage from './pages/CharacterPage.tsx'

function App () {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/character" element={<Characters/>}/>
        <Route path="/character/:id" element={<CharacterPage/>}/>
      </Routes>
    </>
  )
}

export default App

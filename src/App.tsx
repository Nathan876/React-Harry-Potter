import './App.css'
import Header from './components/Header.tsx'
import { Route, Routes } from 'react-router'
import Characters from './pages/Characters.tsx'
import Home from './pages/Home.tsx'

function App () {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/characters" element={<Characters/>}/>
      </Routes>
    </>
  )
}

export default App

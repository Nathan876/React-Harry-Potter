import './App.css'
import Header from './components/Header.tsx'
import { Route, Routes } from 'react-router'
import Characters from './pages/Characters.tsx'
import Home from './pages/Home.tsx'
import CharacterPage from './pages/CharacterPage.tsx'
import {useTheme} from "./hooks/useTheme.tsx";

function App () {
    const { theme } = useTheme()

    const getThemeClasses = () => {
        switch (theme) {
            case 'Gryffindor':
                return 'bg-red-900 text-yellow-400'
            case 'Slytherin':
                return 'bg-green-900 text-gray-300'
            case 'Ravenclaw':
                return 'bg-blue-900 text-yellow-500'
            case 'Hufflepuff':
                return 'bg-yellow-500 text-black'
            case 'Accessible':
                return 'bg-white text-black text-xl'
            default:
                return 'bg-white text-black'
        }
    }

    return (
    <div className={`min-h-screen transition-colors duration-300 font-lora ${getThemeClasses()}`}>
        <Header/>
        <main className="p-4">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/characters" element={<Characters/>}/>
                <Route path="/character/:id" element={<CharacterPage/>}/>
            </Routes>
        </main>
    </div>
)
}

export default App

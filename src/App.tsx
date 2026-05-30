import './App.css'
import Header from './components/Header.tsx'
import { Navigate, Route, Routes } from 'react-router'
import {useTheme} from "./hooks/useTheme.tsx";
import CharacterGame from './pages/CharacterGame.tsx'
import SpellGame from './pages/SpellGame.tsx'

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
                <Route path="/" element={<Navigate to="/character" replace />} />
                <Route path="/character" element={<CharacterGame/>}/>
                <Route path="/spell" element={<SpellGame/>}/>
            </Routes>
        </main>
    </div>
)
}

export default App

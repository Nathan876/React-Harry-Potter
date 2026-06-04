import {useTheme} from "../hooks/useTheme.tsx"
import type {Theme} from "../contexts/ThemeContext.tsx"


function Card() {
    const {theme} = useTheme()

    const themeStyles: Record<Theme, string> = {
        Gryffindor: "bg-red-800 text-yellow-400 border-yellow-500 focus:ring-yellow-500/50",
        Slytherin: "bg-green-800 text-gray-300 border-gray-400  focus:ring-gray-400/50",
        Ravenclaw: "bg-blue-900 text-bronze-400 border-blue-400 focus:ring-blue-400/50",
        Hufflepuff: "bg-yellow-500 text-black border-black focus:ring-yellow-600/50",
        Accessible: "bg-white text-black border-black focus:ring-black/50"
    }

    const baseClasses = "mb-8 p-4 rounded-lg text-center flex items-center justify-between"

    return (
        <div className={`${baseClasses} ${themeStyles[theme]}`}>
            <h1>Titre</h1>
        </div>
    )
}

export default Card
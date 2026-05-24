import {useTheme} from "../hooks/useTheme.tsx";
import type {Theme} from "../contexts/ThemeContext.tsx";

interface FiltersProps {
    options: string[];
    activeFilter: string;
    onChange: (filter: string) => void;
    title?: string;
}

function Filters(props: FiltersProps) {
    const { theme } = useTheme();

    const activeStyles: Record<Theme, string> = {
        Gryffindor: "bg-red-800 text-yellow-400 border-yellow-500 shadow-md",
        Slytherin: "bg-green-800 text-gray-300 border-gray-400 shadow-md",
        Ravenclaw: "bg-blue-900 text-bronze-400 border-blue-400 shadow-md",
        Hufflepuff: "bg-yellow-500 text-black border-black shadow-md",
        Accessible: "bg-black text-white border-black shadow-md"
    };

    const inactiveStyles: Record<Theme, string> = {
        Gryffindor: "bg-transparent text-red-900 border-red-800 hover:bg-red-800 hover:text-yellow-400 hover:border-yellow-500",
        Slytherin: "bg-transparent text-green-900 border-green-800 hover:bg-green-800 hover:text-gray-300 hover:border-gray-400",
        Ravenclaw: "bg-transparent text-blue-900 border-blue-800 hover:bg-blue-900 hover:text-bronze-400 hover:border-blue-400",
        Hufflepuff: "bg-transparent text-yellow-700 border-yellow-600 hover:bg-yellow-500 hover:text-black hover:border-black",
        Accessible: "bg-transparent text-black border-black hover:bg-gray-200"
    };

    return (
        <section className="bg-orange-50 p-8 rounded-lg shadow-lg border border-red-900/10">
            <div className="flex flex-wrap justify-center gap-4">
                {props.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => props.onChange(option)}
                        className={`px-6 py-2 rounded-full font-cinzel font-semibold transition-all duration-300 border ${
                            props.activeFilter === option
                                ? `${activeStyles[theme]} cursor-default`
                                : `${inactiveStyles[theme]} cursor-pointer hover:shadow-md`
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default Filters;
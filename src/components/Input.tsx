import {useTheme} from "../hooks/useTheme.tsx";
import type {Theme} from "../contexts/ThemeContext.tsx";

interface propsInput {
    label: string;
    id: string;
    placeholder?: string;
    type?: string
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: propsInput){
    const { theme } = useTheme();

    const sectionStyles: Record<Theme, string> = {
        Gryffindor: "bg-orange-50 border-red-900/20",
        Slytherin: "bg-green-50 border-green-900/20",
        Ravenclaw: "bg-blue-50 border-blue-900/20",
        Hufflepuff: "bg-yellow-50 border-yellow-900/20",
        Accessible: "bg-white border-black/20"
    };

    const labelStyles: Record<Theme, string> = {
        Gryffindor: "text-red-900",
        Slytherin: "text-green-900",
        Ravenclaw: "text-blue-900",
        Hufflepuff: "text-yellow-900",
        Accessible: "text-black"
    };

    const inputStyles: Record<Theme, string> = {
        Gryffindor: "text-red-900 border-red-900/30 focus:border-yellow-500 focus:ring-yellow-500/50 placeholder-red-900/40",
        Slytherin: "text-green-900 border-green-900/30 focus:border-gray-400 focus:ring-gray-400/50 placeholder-green-900/40",
        Ravenclaw: "text-blue-900 border-blue-900/30 focus:border-blue-400 focus:ring-blue-400/50 placeholder-blue-900/40",
        Hufflepuff: "text-yellow-900 border-yellow-900/30 focus:border-yellow-600 focus:ring-yellow-600/50 placeholder-yellow-900/40",
        Accessible: "text-black border-black focus:border-black focus:ring-black placeholder-gray-600"
    };
    return (
        <section className={`p-8 rounded-lg shadow-lg border flex flex-col justify-center transition-colors duration-300 ${sectionStyles[theme]}`}>
            <div className="relative w-full">
                <label
                    htmlFor={props.id}
                    className={`block font-cinzel font-semibold mb-2 pl-2 transition-colors duration-300 ${labelStyles[theme]}`}
                >
                    {props.label}
                </label>

                <input
                    type={props.type}
                    id={props.id}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    className={`w-full px-6 py-3 bg-stone-100 rounded-full shadow-inner focus:outline-none focus:ring-2 transition-all duration-300 italic ${inputStyles[theme]}`}
                />
            </div>
        </section>
    )
};

export default Input;
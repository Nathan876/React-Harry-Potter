import * as React from "react";
import type {Theme} from "../contexts/ThemeContext.tsx";
import {useTheme} from "../hooks/useTheme.tsx";

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label: string;
    id: string;
    options: SelectOption[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
}

function Select(props: SelectProps) {
    const { theme } = useTheme();

    const labelStyles: Record<Theme, string> = {
        Gryffindor: "text-red-900",
        Slytherin: "text-green-900",
        Ravenclaw: "text-blue-900",
        Hufflepuff: "text-yellow-900",
        Accessible: "text-black"
    };

    const selectStyles: Record<Theme, string> = {
        Gryffindor: "bg-red-800 text-yellow-400 border-yellow-500 focus:border-yellow-400 focus:ring-yellow-500/50",
        Slytherin: "bg-green-800 text-gray-200 border-gray-400 focus:border-gray-300 focus:ring-gray-400/50",
        Ravenclaw: "bg-blue-900 text-blue-200 border-blue-400 focus:border-blue-300 focus:ring-blue-400/50",
        Hufflepuff: "bg-yellow-500 text-black border-black focus:border-gray-800 focus:ring-yellow-600/50",
        Accessible: "bg-white text-black border-black focus:border-black focus:ring-black"
    };

    const iconStyles: Record<Theme, string> = {
        Gryffindor: "text-yellow-400",
        Slytherin: "text-gray-200",
        Ravenclaw: "text-blue-200",
        Hufflepuff: "text-black",
        Accessible: "text-black"
    };

    return (
        <section >
            <div className="relative w-full">
                <label
                    htmlFor={props.id}
                    className={`block font-cinzel font-semibold mb-2 pl-2 transition-colors duration-300 ${labelStyles[theme]}`}
                >
                    {props.label}
                </label>

                <div className="relative">
                    <select
                        id={props.id}
                        value={props.value}
                        onChange={props.onChange}
                        className={`w-full appearance-none px-6 py-3 rounded-full shadow-inner focus:outline-none focus:ring-2 transition-all duration-300 cursor-pointer border ${selectStyles[theme]}`}
                    >
                        {props.placeholder && <option value="" disabled>{props.placeholder}</option>}
                        {props.options.map((option: SelectOption) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 transition-colors duration-300 ${iconStyles[theme]}`}>
                        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Select;
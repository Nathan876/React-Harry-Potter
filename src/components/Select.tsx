import * as React from "react";

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
    return (
        <section className="bg-orange-50 p-8 rounded-lg shadow-lg border border-red-900/10 flex flex-col justify-center">
            <div className="relative w-full">
                <label htmlFor={props.id} className="block font-cinzel font-semibold text-red-900 mb-2 pl-2">{props.label}</label>
                <div className="relative">
                    <select
                        id={props.id}
                        value={props.value}
                        onChange={props.onChange}
                        className="w-full appearance-none px-6 py-3 bg-stone-100 text-red-900 border border-red-900/30 rounded-full shadow-inner focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 cursor-pointer"
                    >
                        <option value="" disabled>{props.placeholder}</option>
                        {props.options.map((option: SelectOption) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-yellow-600">
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
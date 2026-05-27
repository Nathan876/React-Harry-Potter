import {useTheme} from "../hooks/useTheme.tsx";
import type {Theme} from "../contexts/ThemeContext.tsx";

interface ToggleSwitchProps {
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    labelLeft: string;
    labelRight: string;
}

function ToggleSwitch(props: ToggleSwitchProps) {

    const { theme } = useTheme();

    const sectionStyles: Record<Theme, string> = {
        Gryffindor: "bg-orange-50 border-red-900/20",
        Slytherin: "bg-green-50 border-green-900/20",
        Ravenclaw: "bg-blue-50 border-blue-900/20",
        Hufflepuff: "bg-yellow-50 border-yellow-900/20",
        Accessible: "bg-white border-black/20"
    };

    const activeTextStyles: Record<Theme, string> = {
        Gryffindor: "text-red-900 drop-shadow-sm",
        Slytherin: "text-green-900 drop-shadow-sm",
        Ravenclaw: "text-blue-900 drop-shadow-sm",
        Hufflepuff: "text-yellow-900 drop-shadow-sm",
        Accessible: "text-black drop-shadow-sm"
    };

    const switchStyles: Record<Theme, string> = {
        Gryffindor: "peer-focus:ring-yellow-500/30 peer-checked:bg-red-800 peer-checked:after:bg-yellow-400 peer-checked:after:border-yellow-200",
        Slytherin: "peer-focus:ring-gray-400/30 peer-checked:bg-green-800 peer-checked:after:bg-gray-300 peer-checked:after:border-gray-100",
        Ravenclaw: "peer-focus:ring-blue-400/30 peer-checked:bg-blue-900 peer-checked:after:bg-bronze-400 peer-checked:after:border-blue-200",
        Hufflepuff: "peer-focus:ring-yellow-600/30 peer-checked:bg-yellow-500 peer-checked:after:bg-black peer-checked:after:border-gray-800",
        Accessible: "peer-focus:ring-black/30 peer-checked:bg-black peer-checked:after:bg-white peer-checked:after:border-gray-300"
    };

    return (
        <section className={`p-8 rounded-lg shadow-lg border flex flex-col justify-center items-center transition-colors duration-300 ${sectionStyles[theme]}`}>

            <span className={`font-cinzel font-semibold transition-colors duration-300 ${!props.checked ? activeTextStyles[theme] : 'text-gray-500'}`}>
                {props.labelLeft}
            </span>

            <label className="relative inline-flex items-center cursor-pointer my-4">
                <input
                    id={props.id}
                    type="checkbox"
                    className="sr-only peer"
                    checked={props.checked}
                    onChange={(e) => props.onChange(e.target.checked)}
                />

                <div className={`w-14 h-7 bg-gray-300 rounded-full shadow-inner peer peer-focus:outline-none peer-focus:ring-4 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all ${switchStyles[theme]}`}>
                </div>
            </label>

            <span className={`font-cinzel font-bold transition-colors duration-300 ${props.checked ? activeTextStyles[theme] : 'text-gray-500'}`}>
                {props.labelRight}
            </span>

        </section>
    );
}

export default ToggleSwitch;
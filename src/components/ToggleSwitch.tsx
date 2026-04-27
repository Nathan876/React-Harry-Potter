interface ToggleSwitchProps {
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    labelLeft: string;
    labelRight: string;
}

function ToggleSwitch(props: ToggleSwitchProps) {
    return (
        <section className="bg-orange-50 p-8 rounded-lg shadow-lg border border-red-900/10 flex flex-col justify-center items-center">
        <span className={`font-cinzel font-semibold transition-colors duration-300 ${!props.checked ? 'text-red-900 drop-shadow-sm' : 'text-gray-500'}`}>
          {props.labelLeft}
        </span>

                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        id={props.id}
                        type="checkbox"
                        className="sr-only peer"
                        checked={props.checked}
                        onChange={(e) => props.onChange(e.target.checked)}
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-800 peer-checked:after:bg-yellow-400 peer-checked:after:border-yellow-200 shadow-inner"></div>
                </label>

                <span className={`font-cinzel font-bold transition-colors duration-300 ${props.checked ? 'text-red-900 drop-shadow-sm' : 'text-gray-500'}`}>
                    {props.labelRight} </span>
        </section>
    );
}

export default ToggleSwitch;
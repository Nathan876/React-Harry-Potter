interface FiltersProps {
    options: string[];
    activeFilter: string;
    onChange: (filter: string) => void;
    title?: string;
}

function Filters(props: FiltersProps) {
    return (
        <section className="bg-orange-50 p-8 rounded-lg shadow-lg border border-red-900/10">
            <div className="flex flex-wrap justify-center gap-4">
                {props.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => props.onChange(option)}
                        className={`px-6 py-2 rounded-full font-cinzel font-semibold transition-all duration-300 ${
                            props.activeFilter === option
                                ? 'bg-red-800 text-yellow-400 border border-yellow-500 shadow-md cursor-default'
                                : 'bg-transparent text-red-900 border border-red-800 hover:bg-red-800 hover:text-yellow-400 hover:border-yellow-500 hover:shadow-md'
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
interface propsInput {
    label: string;
    id: string;
    placeholder?: string;
    type?: string
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: propsInput){
    return (
        <section className="bg-orange-50 p-8 rounded-lg shadow-lg border border-red-900/10 flex flex-col justify-center">
            <div className="relative w-full">
                <label htmlFor={props.id} className="block font-cinzel font-semibold text-red-900 mb-2 pl-2">{props.label}</label>
                <input type={props.type} id={props.id} value={props.value} onChange={props.onChange} placeholder={props.placeholder}
                       className="w-full px-6 py-3 bg-stone-100 text-red-900 border border-red-900/30 rounded-full shadow-inner focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 placeholder-red-900/40 italic"/>
            </div>
        </section>
    )
};

export default Input;
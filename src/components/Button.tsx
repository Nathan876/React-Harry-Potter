interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
}

function Button(props: ButtonProps) {
    return (
        <button type="button" {...props} className="px-8 py-3 bg-red-800 text-yellow-400 border-2 border-yellow-500 rounded-full font-cinzel font-bold uppercase tracking-widest shadow-lg hover:bg-red-700 hover:text-yellow-200 hover:shadow-[0_0_20px_rgba(234,179,8,0.6)] hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-500/50">
            {props.children}
        </button>
    );
}

export default Button;

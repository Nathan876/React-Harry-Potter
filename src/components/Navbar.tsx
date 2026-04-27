function Navbar(){
    return (
        <nav
            className="bg-red-900 text-yellow-500 shadow-[0_4px_20px_rgba(127,29,29,0.5)] border-b-2 border-yellow-600 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    <div className="flex-shrink-0 flex items-center cursor-pointer">
                        <span
                            className="font-cinzel font-bold text-2xl tracking-widest text-yellow-400 drop-shadow-md">GRYFFONDOR</span>
                    </div>
                    <div className="hidden md:flex space-x-8 items-center">
                        <a href="#"
                           className="font-cinzel font-semibold text-sm uppercase tracking-wide hover:text-yellow-200 transition-colors duration-300">La
                            Salle Commune</a>
                        <a href="#"
                           className="font-cinzel font-semibold text-sm uppercase tracking-wide hover:text-yellow-200 transition-colors duration-300">Sortilèges</a>
                        <a href="#"
                           className="font-cinzel font-semibold text-sm uppercase tracking-wide hover:text-yellow-200 transition-colors duration-300">Héritage</a>
                    </div>
                    <div className="hidden md:flex">
                        <button
                            className="font-cinzel font-bold text-sm text-red-900 bg-yellow-500 hover:bg-yellow-400 px-6 py-2 rounded-full shadow-md transition-all duration-300 border border-yellow-300">
                            Connexion
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
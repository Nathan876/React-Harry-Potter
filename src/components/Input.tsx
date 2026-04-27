function Input(){
    return (
        <section class="bg-orange-50 p-8 rounded-lg shadow-lg border border-red-900/10 flex flex-col justify-center">
            <h2 class="font-cinzel font-bold text-xl text-red-900 mb-6 border-b border-yellow-500/50 pb-2 text-center">Champ de Texte</h2>
            <div class="relative w-full">
                <label for="spell" class="block font-cinzel font-semibold text-red-900 mb-2 pl-2">Inscrivez votre sortilège</label>
                <input type="text" id="spell" placeholder="Ex: Expelliarmus..."
                       class="w-full px-6 py-3 bg-stone-100 text-red-900 border border-red-900/30 rounded-full shadow-inner focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 placeholder-red-900/40 italic">
            </div>
        </section>
    )
};

export default Input;
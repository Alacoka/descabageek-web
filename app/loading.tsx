export default function Loading() {
    return (
        <div className="min-h-[70vh] w-full flex flex-col items-center justify-center gap-8 text-white selection:bg-purple-500/30">

            {/* O Motor Cyberpunk (Anéis a girar) */}
            <div className="relative flex items-center justify-center w-28 h-28">
                {/* Anel Exterior Ciano (Gira para a direita) */}
                <div className="absolute w-full h-full border-t-4 border-r-4 border-cyan-400/80 border-solid rounded-full animate-spin shadow-[0_0_15px_rgba(34,211,238,0.4)]"></div>

                {/* Anel Interior Roxo (Gira para a esquerda) */}
                <div className="absolute w-20 h-20 border-b-4 border-l-4 border-purple-500/80 border-solid rounded-full animate-[spin_1.5s_reverse_infinite] shadow-[0_0_15px_rgba(168,85,247,0.4)]"></div>

                {/* Ícone de Energia no Centro */}
                <div className="w-12 h-12 bg-[#0a021c] border border-purple-900/50 rounded-full flex items-center justify-center z-10">
                    <svg className="w-6 h-6 text-cyan-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </div>
            </div>

            {/* Textos de Feedback */}
            <div className="flex flex-col items-center gap-3 text-center">
                <h2 className="text-2xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse">
                    Carreando...
                </h2>
                {/* <p className="text-xs md:text-sm text-gray-500 font-medium tracking-widest uppercase max-w-[250px] leading-relaxed">
                    Sincronizando com os servidores do DescabaGeek...
                </p> */}
            </div>

        </div>
    );
}
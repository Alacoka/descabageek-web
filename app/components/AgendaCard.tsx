interface AgendaProps {
    titulo: string;
    descricao?: string; // 🚀 Adicionámos a descrição aqui
    data: string;
    capaUrl: string;
    tags: string[];
    linkPlataforma?: string;
}

const formatarData = (dataString: string) => {
    const data = new Date(dataString + 'T12:00:00Z');
    const dia = data.getDate().toString().padStart(2, '0');
    const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    const mes = meses[data.getMonth()];
    // Já não precisamos do ano aqui porque tirámos a data da parte de baixo!

    return { dia, mes };
};

export default function AgendaCard({ item }: { item: AgendaProps }) {
    const { dia, mes } = formatarData(item.data);
    const hasLink = Boolean(item.linkPlataforma);

    return (
        <div className="relative group block w-full max-w-[320px] rounded-2xl overflow-hidden bg-[#0c041c] border border-purple-900/40 hover:border-purple-500/60 transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]">

            {/* LINK EXTERNO INVISÍVEL COBRINDO O CARD */}
            {hasLink && (
                <a href={item.linkPlataforma} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20">
                    <span className="sr-only">Acessar {item.titulo}</span>
                </a>
            )}

            {/* PARTE SUPERIOR - IMAGEM E BADGES */}
            <div className="relative h-[340px] w-full overflow-hidden">
                <img
                    src={item.capaUrl}
                    alt={item.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0c041c] via-[#0c041c]/40 to-transparent"></div>

                {/* Badge da Data */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-purple-500/50 rounded-xl flex flex-col items-center justify-center w-[54px] h-[60px] shadow-lg z-10">
                    <span className="text-white font-black text-2xl leading-none">{dia}</span>
                    <span className="text-gray-300 font-bold text-[10px] uppercase mt-1 tracking-wider">{mes}.</span>
                </div>

                {/* Badges/Tags */}
                <div className="absolute bottom-3 left-4 flex flex-wrap gap-2 z-10">
                    {item.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white bg-black/40 backdrop-blur-sm border border-cyan-400/80 rounded-md"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* PARTE INFERIOR - TEXTOS */}
            <div className="px-5 pt-3 pb-6 flex flex-col gap-1 relative z-10">
                <h3 className="text-white font-black text-xl leading-tight line-clamp-2 group-hover:text-purple-400 transition-colors">
                    {item.titulo}
                </h3>

                {/* 🚀 A tua nova Descrição entra aqui! */}
                {item.descricao && (
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                        {item.descricao}
                    </p>
                )}
            </div>
        </div>
    );
}

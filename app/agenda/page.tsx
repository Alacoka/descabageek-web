import Link from 'next/link';

export default async function AgendaPage() {
    const hoje = new Date().toISOString().split('T')[0];

    const res = await fetch(
        `http://localhost:1337/api/agendas?filters[data_lancamento][$gte]=${hoje}&sort=data_lancamento:asc&populate=*`,
        { cache: 'no-store' }
    );

    const json = await res.json();
    const lancamentos = json.data || [];

    const formatarData = (dataString: string) => {
        if (!dataString) return { dia: '', mes: '', ano: '' };
        const data = new Date(dataString);
        return {
            dia: data.toLocaleDateString('pt-BR', { day: '2-digit' }),
            mes: data.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase(),
            ano: data.toLocaleDateString('pt-BR', { year: 'numeric' })
        };
    };

    // 1. Cores ajustadas para os novos nomes exatos
    const getTipoColor = (tipo: string) => {
        if (!tipo) return 'text-purple-400 border-purple-400';
        const t = tipo.toUpperCase();
        if (t === 'CINEMA') return 'text-pink-400 border-pink-400';
        if (t === 'STREAMING') return 'text-cyan-400 border-cyan-400';
        if (t === 'HQ-MANGA' || t === 'ANIMAÇÕES') return 'text-orange-400 border-orange-400';
        if (t === 'GAMES') return 'text-emerald-400 border-emerald-400';
        return 'text-purple-400 border-purple-400';
    };

    const getImageUrl = (item: any) => {
        const dados = item.attributes || item;
        if (dados.imagem?.data?.attributes?.url) return `http://localhost:1337${dados.imagem.data.attributes.url}`;
        if (dados.imagem?.url) return `http://localhost:1337${dados.imagem.url}`;
        return null;
    };

    // 2. Agrupamento à prova de balas (Ignora espaços, acentos e erros de digitação)
    const agruparPorTipo = (lista: any[]) => {
        const grupos: Record<string, any[]> = {};

        lista.forEach(item => {
            const dados = item.attributes || item;
            // Pega o texto do Strapi, remove espaços em branco nas pontas e põe tudo em maiúsculas
            const tipoBruto = dados.tipo ? String(dados.tipo).trim().toUpperCase() : '';

            let nomeSessao = 'OUTROS';

            // O Funil Inteligente:
            if (tipoBruto.includes('HQ') || tipoBruto.includes('MANGA') || tipoBruto.includes('MANGÁ')) {
                nomeSessao = 'HQ-MANGA';
            } else if (tipoBruto.includes('ANIMAÇ') || tipoBruto.includes('ANIME')) {
                nomeSessao = 'ANIMAÇÕES';
            } else if (tipoBruto.includes('GAME') || tipoBruto.includes('JOGO')) {
                nomeSessao = 'GAMES';
            } else if (tipoBruto.includes('STREAM')) {
                nomeSessao = 'STREAMING';
            } else if (tipoBruto.includes('CINEMA') || tipoBruto.includes('FILME')) {
                nomeSessao = 'CINEMA';
            } else if (tipoBruto !== '') {
                nomeSessao = tipoBruto; // Se criar uma categoria nova no Strapi, ele usa ela mesma
            }

            if (!grupos[nomeSessao]) {
                grupos[nomeSessao] = [];
            }
            grupos[nomeSessao].push(item);
        });

        return grupos;
    };

    const lancamentosAgrupados = agruparPorTipo(lancamentos);
    const nomesDasSessoes = Object.keys(lancamentosAgrupados); // Pega os títulos pra desenhar a tela

    return (
        <main className="min-h-screen p-6 md:p-12 max-w-[1200px] mx-auto text-white">
            <header className="mb-12 border-b border-purple-900/50 pb-8 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 uppercase">
                    Agenda Geek
                </h1>
                <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto md:mx-0">
                    Fique por dentro das datas de estreia dos próximos filmes, séries, jogos e mangás.
                </p>
            </header>

            <div className="flex flex-col gap-16">
                {nomesDasSessoes.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 font-bold tracking-widest uppercase">
                        Nenhum lançamento cadastrado no momento.
                    </div>
                ) : (
                    nomesDasSessoes.map((sessao) => (
                        <section key={sessao} className="flex flex-col">

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-2 h-8 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                                <h2 className="text-2xl font-black text-gray-100 tracking-widest uppercase">
                                    {sessao}
                                </h2>
                                <div className="flex-grow h-px bg-gradient-to-r from-purple-900/50 to-transparent ml-4"></div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                {lancamentosAgrupados[sessao].map((item: any) => {
                                    const dados = item.attributes || item;
                                    const data = formatarData(dados.data_lancamento);
                                    const colorClass = getTipoColor(dados.tipo);

                                    return (
                                        <div
                                            key={item.id}
                                            className={`flex flex-col bg-[#0f0224]/80 border border-purple-900/30 rounded-2xl overflow-hidden transition-all duration-300 group relative shadow-lg ${dados.link_plataforma ? 'hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] cursor-pointer hover:-translate-y-1' : 'hover:border-purple-500'}`}
                                        >

                                            {dados.link_plataforma && (
                                                <a
                                                    href={dados.link_plataforma}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="absolute inset-0 z-50"
                                                    aria-label={`Acessar ${dados.titulo}`}
                                                ></a>
                                            )}

                                            <div className="w-full aspect-[3/4] bg-[#030009] relative overflow-hidden">
                                                {getImageUrl(item) ? (
                                                    <img
                                                        src={getImageUrl(item)}
                                                        alt={dados.titulo}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#060111] text-purple-900">
                                                        <span className="text-4xl mb-2">📅</span>
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">Sem Imagem</span>
                                                    </div>
                                                )}

                                                <div className="absolute top-3 right-3 bg-[#060111]/90 backdrop-blur-md border border-purple-900/50 rounded-xl p-2 min-w-[50px] flex flex-col items-center justify-center shadow-2xl z-10 group-hover:border-cyan-400 transition-colors">
                                                    <span className="text-xl font-black text-white leading-none">
                                                        {data.dia}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mt-1">
                                                        {data.mes}
                                                    </span>
                                                </div>

                                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f0224]/90 to-transparent z-10"></div>
                                            </div>

                                            <div className="p-5 flex flex-col flex-grow relative z-20 -mt-10">
                                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md border bg-[#060111] uppercase tracking-wider ${colorClass}`}>
                                                        {dados.tipo || 'Evento'}
                                                    </span>

                                                    {dados.plataforma && (
                                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md border uppercase tracking-wider flex items-center gap-1 transition-colors ${dados.link_plataforma ? 'border-cyan-800 bg-cyan-950/50 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)] group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-400' : 'border-gray-800 bg-gray-900 text-gray-300'}`}>
                                                            {dados.plataforma} {dados.link_plataforma && <span className="text-[10px]">↗</span>}
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="text-lg md:text-xl font-bold text-gray-100 group-hover:text-cyan-400 transition-colors leading-tight mb-2">
                                                    {dados.titulo}
                                                </h3>

                                                {/* <div className="mt-auto pt-4 flex items-center justify-between text-xs font-semibold text-gray-500 tracking-wider">
                                                    {data.dia} {data.mes} {data.ano}
                                                </div> */}
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))
                )}
            </div>
        </main>
    );
}
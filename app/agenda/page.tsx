import Link from 'next/link';
import type { Metadata } from "next";
import AgendaCard from '../components/AgendaCard';

export const metadata: Metadata = {
    title: 'Agenda | DescabaGeek',
    description: 'Fica de olho nas datas dos próximos lançamentos e eventos.',
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://descabageek-admin.onrender.com';

export default async function AgendaPage() {
    const res = await fetch(`${apiUrl}/api/agendas?populate=*&sort=data_lancamento:asc`, {
        cache: 'no-store'
    });

    const json = await res.json();
    const agendas = json.data || [];

    const secoes = [
        { id: 'HQ-MANGA', titulo: 'HQS & MANGÁS' },
        { id: 'ANIMAÇÕES', titulo: 'ANIMAÇÕES' },
        { id: 'GAMES', titulo: 'GAMES' },
        { id: 'STREAMING', titulo: 'STREAMING' },
        { id: 'CINEMA', titulo: 'CINEMA' }
    ];

    return (
        <main className="min-h-screen p-6 md:p-12 max-w-6xl mx-auto text-white selection:bg-purple-500/30">

            <Link href="/" className="text-purple-500 font-bold mb-8 inline-flex items-center gap-2 hover:text-cyan-400 transition-colors uppercase tracking-widest text-xs">
                <span className="text-lg leading-none">&larr;</span> Voltar para o Início
            </Link>

            <header className="mb-12 border-b border-purple-900/30 pb-6">
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-cyan-400">
                    AGENDA
                </h1>
            </header>

            {agendas.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-purple-900/30 rounded-3xl">
                    <p className="text-purple-500 font-bold mb-2">Estamos preparando mais posts para você!</p>
                    <p className="text-sm text-gray-500">Ainda não existem posts publicados nesta categoria.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-16">
                    {secoes.map((secao) => {
                        const agendasDaSecao = agendas.filter((item: any) => {
                            // Strapi v5 não tem 'attributes', os dados vêm direto no item
                            const dados = item.attributes || item;
                            return dados.tipo === secao.id;
                        });

                        if (agendasDaSecao.length === 0) return null;

                        return (
                            <section key={secao.id}>
                                <h2 className="text-2xl md:text-3xl font-black text-white mb-6 border-l-4 border-purple-500 pl-4 uppercase tracking-wider">
                                    {secao.titulo}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {agendasDaSecao.map((item: any) => {
                                        const dados = item.attributes || item;

                                        // 🚀 O NOVO RADAR STRAPI V5: Lê direto da array!
                                        let capaUrl = '';
                                        const campoImg = dados.img || dados.imagem || dados.capa;

                                        if (Array.isArray(campoImg) && campoImg.length > 0) {
                                            capaUrl = campoImg[0].url; // Formato do teu Strapi v5 (Multiple Media)
                                        } else if (campoImg?.url) {
                                            capaUrl = campoImg.url; // Caso mudes para Single Media
                                        } else if (campoImg?.data) {
                                            // Fallback de segurança para Strapi antigo (v4)
                                            const mediaData = campoImg.data;
                                            capaUrl = Array.isArray(mediaData) ? mediaData[0]?.attributes?.url : mediaData?.attributes?.url;
                                        }

                                        const imageUrl = capaUrl ? (capaUrl.startsWith('http') ? capaUrl : `${apiUrl}${capaUrl}`) : '/descaba-logo-nobg.png';

                                        const dataFormatada = (dados.data_lancamento || dados.createdAt || new Date().toISOString()).slice(0, 10);
                                        const tagsArray = [dados.plataforma].filter(Boolean);

                                        return (
                                            <AgendaCard
                                                key={item.id}
                                                item={{
                                                    linkPlataforma: dados.link_plataforma,
                                                    titulo: dados.titulo,
                                                    descricao: dados.descricao,
                                                    data: dataFormatada,
                                                    capaUrl: imageUrl,
                                                    tags: tagsArray
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>
            )}
        </main>
    );
}
import Link from 'next/link';
import type { Metadata } from "next";
import AgendaCard from '../components/AgendaCard';

export const metadata: Metadata = {
    title: 'Agenda | DescabaGeek',
    description: 'Fica de olho nas datas dos próximos lançamentos e eventos.',
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://descabageek-admin.onrender.com';

export default async function AgendaPage() {
    // 1. Faz o fetch na coleção de agendas
    const res = await fetch(`${apiUrl}/api/agendas?populate=*&sort=data_lancamento:asc`, {
        cache: 'no-store'
    });

    const json = await res.json();
    const agendas = json.data || [];

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
                    <p className="text-purple-500 font-bold mb-2">Estamos a preparar mais datas para ti!</p>
                    <p className="text-sm text-gray-500">Ainda não existem eventos publicados na agenda.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {agendas.map((item: any) => {
                        const dados = item.attributes || item;

                        // 2. TRATAMENTO DA IMAGEM: Lê o campo "img" como array (Multiple Media)
                        const mediaData = dados.img?.data;
                        const capaUrl = Array.isArray(mediaData)
                            ? mediaData[0]?.attributes?.url // Se for array, pega a primeira imagem
                            : mediaData?.attributes?.url || dados.img?.url; // Fallback caso seja single

                        const imageUrl = capaUrl ? (capaUrl.startsWith('http') ? capaUrl : `${apiUrl}${capaUrl}`) : '/capa-google.png';

                        // 3. Lê a data
                        const dataFormatada = (dados.data_lancamento || dados.createdAt || new Date().toISOString()).slice(0, 10);

                        // 4. Junta os campos tipo e plataforma
                        const tagsArray = [dados.tipo, dados.plataforma].filter(Boolean);

                        return (
                            <AgendaCard
                                key={item.id}
                                item={{
                                    linkPlataforma: dados.link_plataforma,
                                    titulo: dados.titulo,
                                    data: dataFormatada,
                                    capaUrl: imageUrl,
                                    tags: tagsArray
                                }}
                            />
                        );
                    })}
                </div>
            )}
        </main>
    );
}
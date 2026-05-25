import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Listas | DescabaGeek',
    description: 'Confere todos os nossos Listas e Detonados.',
};

// URL da API centralizada
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://descabageek-admin.onrender.com';

export default async function GuiasPage() {
    // Filtro na URL
    const res = await fetch(`${apiUrl}/api/posts?filters[categoria][$eq]=Listas&populate=*`, {
        cache: 'no-store'
    });

    const json = await res.json();
    const posts = json.data || [];

    return (
        <main className="min-h-screen p-6 md:p-12 max-w-6xl mx-auto text-white selection:bg-purple-500/30">

            <Link href="/" className="text-purple-500 font-bold mb-8 inline-flex items-center gap-2 hover:text-cyan-400 transition-colors uppercase tracking-widest text-xs">
                <span className="text-lg leading-none">&larr;</span> Voltar para Início
            </Link>

            <header className="mb-12 border-b border-purple-900/30 pb-6">
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-cyan-400">
                    LISTAS
                </h1>
                {/* <p className="text-gray-400 mt-4 font-medium">Caso tu queira algum texto aqui</p> */}
            </header>

            {posts.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-purple-900/30 rounded-3xl">
                    <p className="text-purple-500 font-bold mb-2">Estamos preparando mais posts para você!</p>
                    <p className="text-sm text-gray-500">Ainda não existem posts publicados nesta categoria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post: any) => {
                        const dados = post.attributes || post;

                        // Lógica da Imagem de Capa
                        const capaUrl = dados.capa?.data?.attributes?.url || dados.capa?.url;
                        const imageUrl = capaUrl ? (capaUrl.startsWith('http') ? capaUrl : `${apiUrl}${capaUrl}`) : '';

                        return (
                            <Link
                                href={`/post/${dados.slug}`}
                                key={post.id}
                                className="group flex flex-col bg-[#030009] border border-purple-900/30 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:border-cyan-400/50 transition-all duration-500"
                            >
                                {imageUrl && (
                                    <div className="w-full aspect-video overflow-hidden bg-purple-900/10">
                                        <img
                                            src={imageUrl}
                                            alt={dados.titulo}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                )}

                                <div className="p-6 flex flex-col flex-grow">
                                    <span className="text-cyan-400 text-[10px] font-black tracking-widest uppercase mb-3">
                                        Listas
                                    </span>
                                    <h2 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-white transition-colors line-clamp-5 leading-tight">
                                        {dados.titulo}
                                    </h2>
                                    <p className="text-sm text-gray-400 line-clamp-5">
                                        {dados.descricao}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </main>
    );
}
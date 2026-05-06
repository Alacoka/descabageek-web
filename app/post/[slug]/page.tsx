import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import type { Metadata } from "next";

// ⚡ URL Centralizada para evitar repetição
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://descabageek-admin.onrender.com';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    // Trocado localhost pela apiUrl
    const res = await fetch(`${apiUrl}/api/posts?filters[slug][$eq]=${slug}&populate[conteudo_do_post][populate]=*`, {
        cache: 'no-store'
    });

    const json = await res.json();
    const post = json.data?.[0];

    if (!post) {
        return { title: 'Post não encontrado | Descabageek' };
    }

    const dados = post.attributes || post;

    return {
        title: `${dados.titulo} | Descabageek`,
        description: dados.descricao || 'Confira esta matéria no Descabageek!',
    };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Busca o post no Strapi pela apiUrl
    const res = await fetch(`${apiUrl}/api/posts?filters[slug][$eq]=${slug}&populate[conteudo_do_post][populate]=*&populate[capa]=*`, {
        cache: 'no-store'
    });

    const json = await res.json();
    const post = json.data?.[0];

    // Tela de erro caso o post não exista
    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-10 text-white">
                <h1 className="text-4xl font-bold mb-4">Post não encontrado :/</h1>
                <Link href="/" className="text-purple-400 hover:text-cyan-400 transition-colors uppercase tracking-widest text-sm font-bold">
                    &larr; Voltar para a Base
                </Link>
            </div>
        );
    }

    // Extraindo os dados
    const dados = post.attributes || post;
    const titulo = dados.titulo;
    const conteudoDinamico = dados.conteudo_do_post;
    const categoria = dados.categoria;
    const dataPublicacao = dados.publishedAt || post.createdAt;

    // ⚡ Ajuste na lógica da imagem para suportar Cloudinary e links locais
    const capaUrl = dados.capa?.data?.attributes?.url || dados.capa?.url;
    let imageUrl: string | undefined = undefined;

    if (capaUrl) {
        imageUrl = capaUrl.startsWith('http') || capaUrl.startsWith('//')
            ? capaUrl
            : `${apiUrl}${capaUrl}`;
    }

    // Funções de formatação
    const formatarData = (dataString: string) => {
        if (!dataString) return '';
        return new Date(dataString).toLocaleDateString('pt-BR', {
            day: '2-digit', month: 'long', year: 'numeric'
        });
    };

    const getCategoryColor = (cat: string) => {
        if (!cat) return 'text-cyan-400';
        const catStr = cat.toLowerCase();
        if (catStr.includes('tech') || catStr.includes('código')) return 'text-cyan-400';
        if (catStr.includes('anime') || catStr.includes('mangá')) return 'text-orange-400';
        if (catStr.includes('rpg') || catStr.includes('jogos')) return 'text-emerald-400';
        if (catStr.includes('pop') || catStr.includes('filmes')) return 'text-pink-400';
        return 'text-purple-400';
    };

    return (
        <main className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto text-white">

            {/* Botão de Voltar Cyberpunk */}
            <Link href="/" className="text-purple-500 font-bold mb-12 inline-flex items-center gap-2 hover:text-cyan-400 transition-colors uppercase tracking-widest text-xs">
                <span className="text-lg leading-none">&larr;</span> Voltar
            </Link>

            <article>
                <header className="mb-10 text-left">
                    {/* Metadados */}
                    <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-gray-500 mb-6">
                        <span className={`${getCategoryColor(categoria)} uppercase tracking-widest`}>
                            {categoria || 'Artigo'}
                        </span>
                        <span className="text-purple-900/50">•</span>
                        <span>{formatarData(dataPublicacao)}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight mb-8">
                        {titulo}
                    </h1>
                </header>

                {/* Imagem de Capa */}
                {imageUrl && (
                    <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#030009] rounded-3xl mb-16 overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.1)] border border-purple-900/40">
                        <img
                            src={imageUrl}
                            alt={titulo}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Conteúdo Renderizado (Dynamic Zone) */}
                <div className="prose prose-lg md:prose-xl prose-invert prose-purple max-w-none text-gray-300 leading-relaxed font-medium">
                    {conteudoDinamico && conteudoDinamico.map((bloco: any, index: number) => {
                        switch (bloco.__component) {
                            case 'shared.bloco-de-texto':
                                // Usa o campo 'text' que aparece no seu print do Strapi
                                return <p key={index} className="mb-4">{bloco.text}</p>;

                            case 'shared.bloco-de-imagem':
                                // Pega a imagem do campo 'img'
                                const imgData = bloco.img?.data?.attributes || bloco.img;
                                if (!imgData?.url) return null;

                                const urlFinal = imgData.url.startsWith('http')
                                    ? imgData.url
                                    : `${apiUrl}${imgData.url}`;

                                return (
                                    <figure key={index} className="my-10">
                                        <img
                                            src={urlFinal}
                                            alt="Imagem da matéria"
                                            className="w-full rounded-2xl shadow-2xl border border-purple-900/20"
                                        />
                                    </figure>
                                );

                            default:
                                return null;
                        }
                    })}
                </div>
            </article>
        </main>
    );
}
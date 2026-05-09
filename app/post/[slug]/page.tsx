import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from "next";

// URL da API centralizada
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://descabageek-admin.onrender.com';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    const res = await fetch(`${apiUrl}/api/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`, {
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

    // Fetch simplificado para garantir compatibilidade com Strapi v5
    const res = await fetch(`${apiUrl}/api/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`, {
        cache: 'no-store'
    });

    const json = await res.json();
    const post = json.data?.[0];

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-10 text-white font-sans">
                <h1 className="text-4xl font-black mb-4 tracking-tighter">Post não encontrado :/</h1>
                <Link href="/" className="text-purple-400 hover:text-cyan-400 transition-all uppercase tracking-widest text-xs font-bold border-b border-purple-900/50 pb-1">
                    &larr; Voltar para a Base
                </Link>
            </div>
        );
    }

    const dados = post.attributes || post;
    const titulo = dados.titulo;

    // Captura dos dois formatos possíveis de conteúdo
    const corpoMarkdown = dados.corpo_do_textoo;
    const conteudoBlocks = dados.conteudo;

    const categoria = dados.categoria;
    const dataPublicacao = dados.publishedAt || post.createdAt;

    // Lógica da Imagem de Capa
    const capaUrl = dados.capa?.data?.attributes?.url || dados.capa?.url;
    let imageUrl: string | undefined = undefined;

    if (capaUrl) {
        imageUrl = capaUrl.startsWith('http') || capaUrl.startsWith('//')
            ? capaUrl
            : `${apiUrl}${capaUrl}`;
    }

    // Helpers de Formatação
    const formatarData = (dataString: string) => {
        if (!dataString) return '';
        return new Date(dataString).toLocaleDateString('pt-BR', {
            day: '2-digit', month: 'long', year: 'numeric'
        });
    };

    const getCategoryColor = (cat: string) => {
        if (!cat) return 'text-purple-400';
        const catStr = cat.toLowerCase();
        if (catStr.includes('tech')) return 'text-cyan-400';
        if (catStr.includes('anime')) return 'text-orange-400';
        if (catStr.includes('rpg')) return 'text-emerald-400';
        return 'text-purple-400';
    };

    return (
        <main className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto text-white selection:bg-purple-500/30">

            <Link href="/" className="text-purple-500 font-bold mb-12 inline-flex items-center gap-2 hover:text-cyan-400 transition-colors uppercase tracking-widest text-xs">
                <span className="text-lg leading-none">&larr;</span> Voltar
            </Link>

            <article>
                <header className="mb-10 text-left">
                    <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-gray-500 mb-6">
                        <span className={`${getCategoryColor(categoria)} uppercase tracking-widest`}>
                            {categoria || 'Mundo Geek'}
                        </span>
                        <span className="text-purple-900/50">•</span>
                        <span>{formatarData(dataPublicacao)}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] mb-8">
                        {titulo}
                    </h1>
                </header>

                {imageUrl && (
                    <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#030009] rounded-3xl mb-16 overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.1)] border border-purple-900/40">
                        <img
                            src={imageUrl}
                            alt={titulo}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                )}

                {/* Área de Conteúdo - Plano de Ataque Final */}
                <div className="prose prose-lg md:prose-xl prose-invert prose-purple max-w-none text-gray-300 leading-relaxed font-medium">
                    {corpoMarkdown && corpoMarkdown.trim().length > 0 ? (
                        <ReactMarkdown
                            components={{
                                img: ({ ...props }) => {
                                    const src = props.src || '';
                                    const fullSrc = (src as string).startsWith('http') ? src : `${apiUrl}${src}`;
                                    return (
                                        <figure className="my-10 group">
                                            <img
                                                src={fullSrc}
                                                alt={props.alt || 'Imagem DescabaGeek'}
                                                className="w-120 h-120 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.15)] border border-purple-900/30 object-cover"
                                            />
                                            {props.alt && (
                                                <figcaption className="ml-5 text-sm text-gray-500 mt-4 font-normal italic">
                                                    {props.alt}
                                                </figcaption>
                                            )}
                                        </figure>
                                    );
                                }
                            }}
                        >
                            {corpoMarkdown}
                        </ReactMarkdown>
                    ) : (
                        /* 🕵️‍♂️ DEBUG: Se não aparecer nada, este aviso vai nos dizer o porquê */
                        <div className="text-center py-20 border-2 border-dashed border-purple-900/30 rounded-3xl">
                            <p className="text-purple-500 font-bold mb-2">DEBUG MODE</p>
                            <p className="text-xs text-gray-500">
                                Tentando ler o campo: <span className="text-cyan-400">corpo_do_textoo</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                Status: {corpoMarkdown === undefined ? "Indefinido" : corpoMarkdown === null ? "Nulo" : "Vazio ou Incompatível"}
                            </p>
                        </div>
                    )}
                </div>
            </article>
        </main>
    );
}
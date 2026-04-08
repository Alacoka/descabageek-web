import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Busca o post no Strapi pelo slug
    const res = await fetch(`http://localhost:1337/api/posts?filters[slug][$eq]=${slug}&populate=*`, {
        cache: 'no-store'
    });

    const json = await res.json();
    const post = json.data[0];

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
    const conteudo = dados.conteudo;
    const categoria = dados.categoria;
    const dataPublicacao = dados.publishedAt || post.createdAt;

    let imageUrl = null;
    if (dados.capa?.data?.attributes?.url) {
        imageUrl = `http://localhost:1337${dados.capa.data.attributes.url}`;
    } else if (dados.capa?.url) {
        imageUrl = `http://localhost:1337${dados.capa.url}`;
    }

    // Funções de formatação (iguais às da Home)
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

                    {/* Metadados: Categoria Neon e Data */}
                    <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-gray-500 mb-6">
                        <span className={`${getCategoryColor(categoria)} uppercase tracking-widest`}>
                            {categoria || 'Artigo'}
                        </span>
                        <span className="text-purple-900/50">•</span>
                        <span>{formatarData(dataPublicacao)}</span>
                    </div>

                    {/* Título da Matéria */}
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

                {/* Conteúdo Renderizado (O texto do Strapi) */}
                <div className="prose prose-lg md:prose-xl prose-invert prose-purple max-w-none text-gray-300 leading-relaxed font-medium">
                    <BlocksRenderer content={conteudo} />
                </div>
            </article>

        </main>
    );
}
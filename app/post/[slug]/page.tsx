import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const res = await fetch(`http://localhost:1337/api/posts?filters[slug][$eq]=${slug}&populate=*`, {
        cache: 'no-store'
    });

    const json = await res.json();
    const post = json.data[0];

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-10 text-white">
                <h1 className="text-4xl font-bold mb-4">Post não encontrado :/</h1>
                <Link href="/" className="text-purple-400 hover:text-cyan-400 hover:underline">Voltar para a Home</Link>
            </div>
        );
    }

    const dados = post.attributes || post;
    const titulo = dados.titulo;
    const conteudo = dados.conteudo;

    let imageUrl = null;
    if (dados.capa?.data?.attributes?.url) {
        imageUrl = `http://localhost:1337${dados.capa.data.attributes.url}`;
    } else if (dados.capa?.url) {
        imageUrl = `http://localhost:1337${dados.capa.url}`;
    }

    return (
        // Fundo da main aqui pra garantir que o post fique isolado num fundo escuro
        <main className="min-h-screen p-8 md:p-16 max-w-4xl mx-auto text-white">
            {/* Botão de Voltar roxo */}
            <Link href="/" className="text-purple-400 font-semibold mb-10 inline-block hover:text-cyan-400 transition-colors">
                &larr; Voltar para a Home
            </Link>

            <article>
                <header className="mb-10">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider text-sm mb-4 block">
                        Artigo
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-8">
                        {titulo}
                    </h1>
                </header>

                {imageUrl && (
                    <div className="w-full aspect-video bg-[#030009] rounded-2xl mb-12 overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.2)] border border-purple-950">
                        <img
                            src={imageUrl}
                            alt={titulo}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* MÁGICA DO typography: adicionamos "prose-invert" e "prose-purple" */}
                <div className="prose prose-lg prose-invert prose-purple max-w-none text-gray-200 leading-relaxed font-medium">
                    <BlocksRenderer content={conteudo} />
                </div>
            </article>
        </main>
    );
}
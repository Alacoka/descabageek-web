import Link from 'next/link';

export default async function Home() {
  const res = await fetch('http://localhost:1337/api/posts?populate=*', {
    cache: 'no-store'
  });

  const json = await res.json();
  const allPosts = json.data;

  // Em um blog clássico, temos 1 Post Principal (o mais recente) e o resto no Feed
  const heroPost = allPosts?.[0];
  const feedPosts = allPosts?.slice(1) || [];

  // Função rápida para formatar a URL da imagem
  const getImageUrl = (post: any) => {
    const dados = post.attributes || post;
    if (dados.capa?.data?.attributes?.url) return `http://localhost:1337${dados.capa.data.attributes.url}`;
    if (dados.capa?.url) return `http://localhost:1337${dados.capa.url}`;
    return null;
  };

  // Função para formatar a data estilo blog (ex: 25 de Março de 2026)
  const formatarData = (dataString: string) => {
    if (!dataString) return '';
    return new Date(dataString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6 md:p-12 max-w-[1200px] mx-auto text-white">

      {/* 1. POST HERÓI (O mais recente em destaque máximo) */}
      {heroPost && (
        <section className="mb-16">
          <h2 className="text-sm font-black text-cyan-400 tracking-[0.2em] uppercase mb-6 border-b border-purple-900/50 pb-2">
            Último Lançamento
          </h2>

          <Link
            href={`/post/${(heroPost.attributes || heroPost).slug}`}
            className="flex flex-col lg:flex-row gap-8 items-center bg-[#0f0224]/50 border border-purple-900/30 rounded-3xl p-4 lg:p-6 hover:bg-[#0f0224] hover:border-purple-600 transition-all duration-500 group"
          >
            {/* Imagem Gigante */}
            <div className="w-full lg:w-2/3 aspect-[16/9] lg:aspect-[16/10] bg-[#030009] rounded-2xl overflow-hidden relative shadow-2xl">
              {getImageUrl(heroPost) ? (
                <img
                  src={getImageUrl(heroPost)}
                  alt={(heroPost.attributes || heroPost).titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">Sem Capa</div>
              )}
              {/* Badge na imagem */}
              <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold uppercase px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                Destaque
              </div>
            </div>

            {/* Texto do Post Herói */}
            <div className="w-full lg:w-1/3 flex flex-col justify-center px-2 lg:px-4 py-4">
              <div className="flex items-center gap-3 text-xs font-semibold text-gray-400 mb-4">
                <span className="text-cyan-400 uppercase tracking-wider">Cultura Geek</span>
                <span>•</span>
                <span>{formatarData((heroPost.attributes || heroPost).publishedAt || heroPost.createdAt)}</span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-black text-white group-hover:text-purple-400 transition-colors leading-tight mb-6">
                {(heroPost.attributes || heroPost).titulo}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                Clique para ler a matéria completa e conferir todos os detalhes que separamos para você no Descabageek.
              </p>

              <span className="inline-flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
                Ler Artigo Completo <span className="text-lg">➔</span>
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* 2. FEED DO BLOG (O restante dos posts) */}
      {feedPosts.length > 0 && (
        <section>
          <h2 className="text-sm font-black text-cyan-400 tracking-[0.2em] uppercase mb-8 border-b border-purple-900/50 pb-2">
            Mais Artigos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {feedPosts.map((post: any) => {
              const dados = post.attributes || post;

              return (
                <Link
                  href={`/post/${dados.slug}`}
                  key={post.documentId || post.id}
                  className="flex flex-col group cursor-pointer"
                >
                  <div className="w-full aspect-[4/3] bg-[#030009] rounded-2xl mb-5 overflow-hidden border border-purple-900/30 group-hover:border-purple-500 transition-colors relative">
                    {getImageUrl(post) ? (
                      <img
                        src={getImageUrl(post)}
                        alt={dados.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">Sem Capa</div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs font-medium text-gray-500 mb-3">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider">Artigo</span>
                    <span>•</span>
                    <span>{formatarData(dados.publishedAt || post.createdAt)}</span>
                  </div>

                  <h3 className="text-xl font-bold leading-snug text-gray-100 group-hover:text-purple-400 transition-colors">
                    {dados.titulo}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
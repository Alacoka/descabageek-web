import { MetadataRoute } from 'next';

// URL do teu Backend e Frontend
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://descabageek-admin.onrender.com';
const siteUrl = 'https://descabageek.vercel.app'; // Atualiza isto quando comprares o domínio .com!

type PostSitemapEntry = {
    slug?: string;
    updatedAt?: string;
    attributes?: {
        slug?: string;
        updatedAt?: string;
    };
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Rotas estáticas do teu site
    const rotasEstaticas = [
        { url: `${siteUrl}`, lastModified: new Date() },
        { url: `${siteUrl}/guias`, lastModified: new Date() },
        { url: `${siteUrl}/listas`, lastModified: new Date() },
        { url: `${siteUrl}/agenda`, lastModified: new Date() },
        { url: `${siteUrl}/contato`, lastModified: new Date() },
        { url: `${siteUrl}/privacidade`, lastModified: new Date() },
    ];

    // 2. Buscar todos os posts no Strapi dinamicamente
    let rotasDinamicas: MetadataRoute.Sitemap = [];

    try {
        // Traz apenas o slug e a data de atualização para ficar leve e rápido
        const res = await fetch(`${apiUrl}/api/posts?fields[0]=slug&fields[1]=updatedAt`, {
            next: { revalidate: 3600 } // Atualiza o cache a cada 1 hora
        });

        const json = await res.json();
        const posts = json.data || [];

        rotasDinamicas = posts.map((post: PostSitemapEntry) => {
            const dados = post.attributes || post;
            return {
                url: `${siteUrl}/post/${dados.slug}`,
                lastModified: new Date(dados.updatedAt || new Date()),
            };
        });
    } catch (error) {
        console.error("Erro ao gerar sitemap dinâmico:", error);
    }

    // Junta as rotas fixas com as matérias do blog e entrega ao Google
    return [...rotasEstaticas, ...rotasDinamicas];
}

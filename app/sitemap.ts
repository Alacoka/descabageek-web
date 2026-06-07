import { MetadataRoute } from 'next';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://descabageek-admin.onrender.com';
const siteUrl = 'https://www.descabageek.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const rotasEstaticas = [
        { url: `${siteUrl}`, lastModified: new Date() },
        { url: `${siteUrl}/guias`, lastModified: new Date() },
        { url: `${siteUrl}/listas`, lastModified: new Date() },
        { url: `${siteUrl}/agenda`, lastModified: new Date() },
        { url: `${siteUrl}/contato`, lastModified: new Date() },
    ];

    let rotasDinamicas: MetadataRoute.Sitemap = [];

    try {
        const res = await fetch(
            `${apiUrl}/api/posts?fields[0]=slug&fields[1]=updatedAt`,
            { next: { revalidate: 3600 } }
        );
        const json = await res.json();
        const posts = json.data || [];

        rotasDinamicas = posts.map((post: any) => {
            const dados = post.attributes || post;
            return {
                url: `${siteUrl}/post/${dados.slug}`,
                lastModified: new Date(dados.updatedAt || new Date()),
            };
        });
    } catch (error) {
        console.error('Erro ao gerar sitemap dinâmico:', error);
    }

    return [...rotasEstaticas, ...rotasDinamicas];
}
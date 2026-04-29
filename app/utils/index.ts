// app/utils/index.ts

export const getStrapiMedia = (url: string | null | undefined): string | null => {
    if (!url) {
        return null;
    }

    // Se a URL já for absoluta (começar com http/https), não faz nada.
    // Isso é útil se um dia você usar um storage externo (como AWS ou Cloudinary)
    if (url.startsWith("http") || url.startsWith("//")) {
        return url;
    }

    // Pega a URL da nuvem que configuramos no .env, ou usa o link direto como garantia
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://descabageek-admin.onrender.com';

    // Prepara o link relativo (ex: /uploads/image.jpg) colocando a API URL na frente
    return `${apiUrl}${url}`;
};
import { MetadataRoute } from 'next';

// Usa o teu domínio atual. Quando comprares o .com, atualizas aqui também!
const siteUrl = 'https://descabageek.com';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*', // O asterisco significa "Aviso para TODOS os robôs da internet"
            allow: '/',     // Podem ler todo o site
            disallow: '/api/', // Mas estão proibidos de bisbilhotar as rotas internas de API
        },
        sitemap: `${siteUrl}/sitemap.xml`, // O mapa do tesouro que criámos no passo anterior
    }
}
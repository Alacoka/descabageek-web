import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Otimização de imagens ─────────────────────────────────────────────────
  // Lista os domínios externos permitidos para o componente <Image />.
  // Sem isso o Next.js bloqueia as imagens por segurança.
  images: {
    remotePatterns: [
      // Cloudinary — CDN de mídia do projeto
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      // Strapi hospedado no Render — substitua pelo hostname real
      // Exemplo: "seu-projeto.onrender.com"
      {
        protocol: "https",
        hostname: process.env.STRAPI_HOSTNAME ?? "descabageek-admin.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },

  // ─── Cabeçalhos de segurança HTTP ─────────────────────────────────────────
  // Aplicados a todas as rotas. Protegem contra os ataques mais comuns.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Impede que o site seja carregado dentro de um <iframe> de outro domínio
          // (proteção contra clickjacking)
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Impede que o browser interprete ficheiros com MIME type errado
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Controla quais informações de referência são enviadas ao navegar
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Força HTTPS por 1 ano (ativar apenas depois de confirmar que o site
          // funciona 100% em HTTPS — não usar em localhost)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // Permissões de funcionalidades do browser — desativa as que o site não usa
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Content Security Policy — define de onde podem vir scripts, estilos, imagens
          // Ajuste os domínios conforme a stack do projeto (Firebase, Cloudinary, etc.)
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts: próprio domínio + Firebase + Vercel Analytics
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.firebaseapp.com https://*.firebase.com https://vercel.live",
              // Estilos: próprio domínio + inline styles do Tailwind
              "style-src 'self' 'unsafe-inline'",
              // Imagens: próprio domínio + Cloudinary + dados inline (base64)
              "img-src 'self' blob: data: https://res.cloudinary.com https://*.googleusercontent.com",
              // Fontes: próprio domínio
              "font-src 'self'",
              // Frames: Firebase Auth usa iframes
              "frame-src https://*.firebaseapp.com https://*.firebase.com",
              // Conexões de rede: API do Strapi + Firebase + Cloudinary
              [
                "connect-src 'self'",
                "https://*.firebaseio.com",
                "https://*.googleapis.com",
                "https://*.cloudfunctions.net",
                "https://api.cloudinary.com",
                // Substitua pelo URL real do seu backend Strapi:
                process.env.NEXT_PUBLIC_API_URL ?? "https://descabageek-admin.onrender.com",
              ].join(" "),
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
import type { NextConfig } from "next";

// ID do teu projeto Firebase — encontras no Firebase Console
const FIREBASE_PROJECT_ID = "descabageek-a59ec";

const nextConfig: NextConfig = {
  // ─── Proxy das rotas de autenticação do Firebase ───────────────────────────
  // O Firebase Auth com authDomain personalizado precisa das rotas /__/auth/*
  // para funcionar. Como o site está na Vercel (não no Firebase Hosting),
  // essas rotas não existem — este rewrite faz o proxy transparente para o
  // Firebase Hosting do projeto, sem precisar migrar o hosting.
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: `https://${FIREBASE_PROJECT_ID}.firebaseapp.com/__/auth/:path*`,
      },
      {
        source: "/__/firebase/:path*",
        destination: `https://${FIREBASE_PROJECT_ID}.firebaseapp.com/__/firebase/:path*`,
      },
    ];
  },

  // ─── Otimização de imagens ─────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: process.env.STRAPI_HOSTNAME ?? "descabageek-admin.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },

  // ─── Cabeçalhos de segurança HTTP ─────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'" +
              " https://*.firebaseapp.com" +
              " https://*.firebase.com" +
              " https://apis.google.com" +
              " https://www.googletagmanager.com" +
              " https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' blob: data:" +
              " https://res.cloudinary.com" +
              " https://*.googleusercontent.com" +
              " https://www.googletagmanager.com" +
              " https://www.google-analytics.com",
              "font-src 'self' https://fonts.gstatic.com",
              // 'self' agora funciona porque o proxy acima serve /__/auth/* localmente
              "frame-src 'self'" +
              " https://*.firebaseapp.com" +
              " https://*.firebase.com" +
              " https://accounts.google.com",
              "connect-src 'self'" +
              " https://*.firebaseio.com" +
              " https://*.googleapis.com" +
              " https://*.cloudfunctions.net" +
              " https://api.cloudinary.com" +
              " https://www.google-analytics.com" +
              " https://analytics.google.com" +
              " https://region1.google-analytics.com" +
              " " + (process.env.NEXT_PUBLIC_API_URL ?? "https://descabageek-admin.onrender.com"),
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
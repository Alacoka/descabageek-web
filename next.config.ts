import type { NextConfig } from "next";

const FIREBASE_PROJECT_ID = "descabageek-a59ec";

const nextConfig: NextConfig = {
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

  async headers() {
    return [
      {
        // Exclui as rotas /__/auth/* e /__/firebase/* dos headers de segurança
        // para não interferir com o Firebase Auth que roda nessas rotas via proxy
        source: "/((?!__/).*)",
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
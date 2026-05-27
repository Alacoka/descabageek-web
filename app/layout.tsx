import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Header from "./components/header";

const fontBase = Montserrat({ subsets: ["latin"], weight: ['400', '600', '700', '800', '900'] });

// Personaliza o título, descrição e as imagens de pré-visualização para redes sociais! Isso ajuda a atrair mais visitantes e a mostrar o teu conteúdo de forma mais profissional.
export const metadata: Metadata = {
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  title: "Descabageek",
  description: "A Sua Fonte de Descabaçamento Nerdístico.",
  openGraph: {
    title: "Descabageek",
    description: "A Sua Fonte de Descabaçamento Nerdístico.",
    url: "https://descabageek.com",
    siteName: "Descabageek",
    images: [
      {
        url: "/logo-google.png",
        width: 1200,
        height: 630,
        alt: "Descabageek - A Sua Fonte de Descabaçamento Nerdístico",
      }
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Descabageek",
    description: "A Sua Fonte de Descabaçamento Nerdístico.",
    images: ["/capa-google.png"],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${fontBase.className} bg-[#060111] text-gray-100 antialiased flex flex-col min-h-screen`}>

        {/* HEADER GEEK NEON (Agora encapsulado e interativo) */}
        <Header />

        {/* CONTEÚDO */}
        <main className="flex-grow">
          {children}
        </main>

        {/* FAT FOOTER GEEK */}
        <footer className="bg-[#030009] text-white pt-16 pb-8 border-t border-purple-950 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

              <div className="md:col-span-2">
                <h2 className="text-3xl font-black tracking-tighter mb-4">
                  DESCABA<span className="text-purple-400">GEEK.</span>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  A Sua Fonte de Descabaçamento Nerdístico!
                </p>
              </div>

              <div>
                <h3 className="font-bold uppercase tracking-wider mb-4 text-gray-200">Saiba mais</h3>
                <ul className="space-y-3 text-sm text-gray-400 font-medium">
                  <li><Link href="https://www.youtube.com/@DescabaGeek" target="blank" className="hover:text-cyan-400 transition-colors">YouTube</Link></li>
                  <li><Link href="/contato" className="hover:text-cyan-400 transition-colors">Fale Conosco</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-purple-950 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-medium">
              <p>&copy; {new Date().getFullYear()} Descabageek.</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
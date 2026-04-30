import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import AuthBotton from "./components/AuthBotton";

// Usando a Montserrat com pesos bem variados
const fontBase = Montserrat({ subsets: ["latin"], weight: ['400', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  icons: {
    icon: '/icon.png',
  },
  title: "Descabageek",
  description: "A Sua Fonte de Descabaçamento Nerdístico.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* Fundo Cyberpunk Dark Profundo */}
      <body className={`${fontBase.className} bg-[#060111] text-gray-100 antialiased flex flex-col min-h-screen`}>

        {/* HEADER GEEK NEON (Base do salvedrew, alma cyberpunk) */}
        <header className="sticky top-0 z-50 bg-[#060111]/90 backdrop-blur-md border-b border-purple-950/50 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-[72px] flex items-center justify-between">

            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 relative flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/descaba-logo-nobg.png"
                  alt="Descabageek"
                  className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                />
              </div>

              {/* Texto ao lado da logo */}
              <span className="text-xl font-extrabold tracking-tighter text-white uppercase hidden sm:block">
                Descaba<span className="text-purple-400 group-hover:text-cyan-400 transition-colors">Geek</span>
              </span>
            </Link>

            {/* Menu com os ícones que você curte */}
            {/* <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-gray-300 tracking-wide uppercase">
              <Link href="/agenda" className="hover:text-white hover:shadow-cyan transition-colors flex items-center gap-2">
                <span className="text-base"></span> Agenda
              </Link>
              <Link href="/listas" className="hover:text-white hover:shadow-cyan transition-colors flex items-center gap-2">
                <span className="text-base"></span> Listas
              </Link>
              <Link href="/guias" className="hover:text-white hover:shadow-cyan transition-colors flex items-center gap-2">
                <span className="text-base"></span> Guias
              </Link>
            </nav> */}

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <AuthBotton />

              {/* Menu Mobile */}
              <button className="lg:hidden text-purple-400 hover:text-white p-2">
                ☰
              </button>
            </div>

          </div>
        </header>

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
                  <li><Link href="mailto:contato@descabageek.com" target="blank" className="hover:text-cyan-400 transition-colors">Contato</Link></li>
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
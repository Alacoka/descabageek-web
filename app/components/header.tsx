"use client";

import { useState } from 'react';
import Link from 'next/link';
import AuthBotton from './AuthBotton';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="sticky top-0 z-50 bg-[#060111]/90 backdrop-blur-md border-b border-purple-950/50 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-[72px] flex items-center justify-between">

                {/* Logo e Texto */}
                <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
                    <div className="w-12 h-12 relative flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <img
                            src="/descaba-logo-nobg.png"
                            alt="Descabageek"
                            className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                        />
                    </div>
                    <span className="text-xl font-extrabold tracking-tighter text-white uppercase hidden sm:block">
                        Descaba<span className="text-purple-400 group-hover:text-cyan-400 transition-colors">Geek</span>
                    </span>
                </Link>

                {/* Menu Desktop */}
                <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-gray-300 tracking-wide uppercase">
                    <Link href="/agenda" className="hover:text-white hover:shadow-cyan transition-colors flex items-center gap-2">
                        Agenda
                    </Link>
                    <Link href="/listas" className="hover:text-white hover:shadow-cyan transition-colors flex items-center gap-2">
                        Listas
                    </Link>
                    <Link href="/guias" className="hover:text-white hover:shadow-cyan transition-colors flex items-center gap-2">
                        Guias
                    </Link>
                    <Link href="/contato" className="hover:text-white hover:shadow-cyan transition-colors flex items-center gap-2">
                        Contato
                    </Link>
                </nav>

                {/* CTAs e Botão Mobile */}
                <div className="flex items-center gap-3">
                    <AuthBotton />

                    <button
                        onClick={toggleMenu}
                        className="lg:hidden text-purple-400 hover:text-white p-2 transition-colors focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        ) : (
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Cortina do Menu Mobile Premium */}
            {isMenuOpen && (
                <nav className="lg:hidden absolute top-[72px] left-0 w-full bg-[#060111]/95 backdrop-blur-xl border-b border-purple-950/50 shadow-2xl flex flex-col items-center py-8 px-6 gap-4 h-[calc(100vh-72px)] overflow-y-auto">

                    <Link href="/agenda" onClick={toggleMenu} className="w-full group flex items-center justify-center p-5 rounded-2xl bg-[#0a021c] border border-purple-900/30 hover:bg-purple-900/20 hover:border-cyan-400/50 transition-all active:scale-[0.98]">
                        <span className="text-gray-300 group-hover:text-cyan-400 font-extrabold uppercase tracking-widest text-lg transition-colors text-center">Agenda</span>
                    </Link>

                    <Link href="/listas" onClick={toggleMenu} className="w-full group flex items-center justify-center p-5 rounded-2xl bg-[#0a021c] border border-purple-900/30 hover:bg-purple-900/20 hover:border-cyan-400/50 transition-all active:scale-[0.98]">
                        <span className="text-gray-300 group-hover:text-cyan-400 font-extrabold uppercase tracking-widest text-lg transition-colors text-center">Listas</span>
                    </Link>

                    <Link href="/guias" onClick={toggleMenu} className="w-full group flex items-center justify-center p-5 rounded-2xl bg-[#0a021c] border border-purple-900/30 hover:bg-purple-900/20 hover:border-cyan-400/50 transition-all active:scale-[0.98]">
                        <span className="text-gray-300 group-hover:text-cyan-400 font-extrabold uppercase tracking-widest text-lg transition-colors text-center">Guias</span>
                    </Link>

                    <Link href="/contato" onClick={toggleMenu} className="w-full group flex items-center justify-center p-5 rounded-2xl bg-[#0a021c] border border-purple-900/30 hover:bg-purple-900/20 hover:border-cyan-400/50 transition-all active:scale-[0.98]">
                        <span className="text-gray-300 group-hover:text-cyan-400 font-extrabold uppercase tracking-widest text-lg transition-colors text-center">Contato</span>
                    </Link>

                </nav>
            )}
        </header>
    );
}
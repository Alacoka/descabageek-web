'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function CortinaManutencao() {
    const pathname = usePathname();
    const [show, setShow] = useState(false);

    useEffect(() => {
        // 🚀 A PORTA DOS FUNDOS: Se a rota começar por /admin, a cortina NÃO aparece!
        if (!pathname.startsWith('/admin')) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [pathname]);

    // Se não for para mostrar, não renderiza nada
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060111] text-white overflow-hidden">
            {/* Fundo com grelha tecnológica */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:34px_34px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
            
            <div className="relative z-10 flex flex-col items-center px-4 text-center">
                {/* Ícone a piscar */}
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-cyan-400 blur-[30px] opacity-20 animate-pulse"></div>
                    <span className="text-7xl relative z-10">🚧</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400 mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    EM BREVE
                </h1>
                
                <p className="text-gray-400 text-lg md:text-xl font-medium max-w-lg leading-relaxed border border-purple-900/30 bg-black/40 backdrop-blur-md p-6 rounded-2xl">
                    Estamos trabalhando para melhorar o nosso blog. O <strong className="text-white">DescabaGeek</strong> volta em breve ainda mais rápido e novidades épicas!
                </p>

                <div className="mt-12 flex items-center gap-3 text-cyan-400/70 text-sm font-bold tracking-widest uppercase">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
                    Sistema em manutenção
                </div>
            </div>
        </div>
    );
}
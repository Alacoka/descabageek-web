import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "../components/ContactForm"; // Importa o teu novo formulário mágico!

export const metadata: Metadata = {
    title: 'Contato | DescabaGeek',
    description: 'Entra em contacto com a equipa do DescabaGeek.',
};

export default function ContatoPage() {
    return (
        <main className="min-h-screen p-6 md:p-12 max-w-5xl mx-auto text-white selection:bg-purple-500/30">

            <Link href="/" className="text-purple-500 font-bold mb-8 inline-flex items-center gap-2 hover:text-cyan-400 transition-colors uppercase tracking-widest text-xs">
                <span className="text-lg leading-none">&larr;</span> Voltar
            </Link>

            <header className="mb-16 border-b border-purple-900/30 pb-6">
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-cyan-400 uppercase">
                    Contato
                </h1>
                <p className="text-gray-400 mt-4 font-medium text-lg max-w-3x2">
                    Tem alguma sugestão de melhoria, sugestão de post, ou quer fechar uma parceria? <br /> Será um prazer te ouvir!
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Lado Esquerdo: Informações Diretas */}
                <ContactForm />

                {/* Lado Direito: Formulário Cyberpunk Injetado */}
                <div className="flex flex-col gap-8">
                    <div className="bg-[#0a021c] border border-purple-900/30 p-8 rounded-3xl shadow-[0_0_30px_rgba(168,85,247,0.05)]">
                        <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-wider">Contato Direto</h2>

                        <div className="flex flex-col gap-8">
                            <div className="flex items-start gap-5 group">
                                <div className="w-14 h-14 rounded-2xl bg-purple-900/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:text-cyan-400 group-hover:border-cyan-400/50 transition-all shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <div className="pt-1">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">E-mail</p>
                                    <a href="mailto:contato@descabageek.com" className="text-lg text-gray-200 hover:text-cyan-400 transition-colors font-medium">contato@descabageek.com</a>
                                </div>
                            </div>

                            {/* <div className="flex items-start gap-5 group">
                                <div className="w-14 h-14 rounded-2xl bg-purple-900/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:text-cyan-400 group-hover:border-cyan-400/50 transition-all shrink-0">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
                                </div>
                                <div className="pt-1">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">YouTube</p>
                                    <a href="https://www.youtube.com/@DescabaGeek" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-200 hover:text-cyan-400 transition-colors font-medium">@DescabaGeek</a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
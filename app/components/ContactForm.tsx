"use client";

import { useState } from 'react';

export default function ContactForm() {
    // Controla se o formulário está 'parado', 'carregando', 'sucesso' ou 'erro'
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Impede a página de recarregar/mudar de ecrã
        setStatus('loading');

        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json' // Diz ao Formspree: "Não me mandes para outra página, devolve-me só um JSON"
                }
            });

            if (response.ok) {
                setStatus('success');
                form.reset(); // Limpa os campos
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    // MENSAGEM DE SUCESSO (após enviar o formulário)
    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center gap-4 bg-[#0a021c] border border-cyan-400/50 p-8 md:p-10 rounded-3xl shadow-[0_0_40px_rgba(34,211,238,0.15)] text-center h-full min-h-[400px]">
                <div className="w-16 h-16 bg-cyan-900/30 rounded-full flex items-center justify-center text-cyan-400 mb-2 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-wider">Mensagem Enviada!</h2>
                <p className="text-gray-400">Sua mensagem chegou na nossa base de dados de forma segura. Responderemos em breve.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-purple-400 hover:text-cyan-400 text-sm font-bold uppercase tracking-widest transition-colors"
                >
                    &larr; Enviar nova mensagem
                </button>
            </div>
        );
    }

    // O FORMULÁRIO NORMAL
    return (
        <form
            action="https://formspree.io/f/mojbkdel"
            method="POST"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 bg-[#0a021c] border border-purple-900/30 p-8 md:p-10 rounded-3xl shadow-[0_0_40px_rgba(34,211,238,0.05)]"
        >
            <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-wider">Contato Conosco</h2>

            {status === 'error' && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-sm font-medium text-center">
                    Falha ao enviar a mensagem. Tente novamente mais tarde.
                </div>
            )}

            <div>
                <label htmlFor="nome" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 mt-4">Nome</label>
                <input type="text" id="nome" name="nome" required disabled={status === 'loading'} className="w-full bg-[#030009] border border-purple-900/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-gray-700 disabled:opacity-50" placeholder="Como devemos te chamar?" />
            </div>

            <div>
                <label htmlFor="email" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">E-mail (opcional)</label>
                <input type="email" id="email" name="email" disabled={status === 'loading'} className="w-full bg-[#030009] border border-purple-900/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-gray-700 disabled:opacity-50" placeholder="teu@email.com" />
            </div>

            <div>
                <label htmlFor="mensagem" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Mensagem</label>
                <textarea id="mensagem" name="mensagem" rows={5} required disabled={status === 'loading'} className="w-full bg-[#030009] border border-purple-900/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none placeholder:text-gray-700 disabled:opacity-50" placeholder="Escreva sua mensagem aqui..."></textarea>
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-4 w-full py-5 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-cyan-600 hover:to-cyan-800 text-white font-black rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] tracking-widest uppercase text-sm border border-purple-500/50 hover:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
                {status === 'loading' ? 'Transmitindo...' : 'Enviar Mensagem'}
            </button>

            <p className="text-xs text-gray-500 leading-6 font-medium">
                Ao enviar, você concorda com o tratamento dos dados informados para resposta ao contato, conforme nossa{" "}
                <a href="/privacidade" className="text-purple-400 hover:text-cyan-400 transition-colors font-bold">
                    Política de Privacidade
                </a>
                .
            </p>
        </form>
    );
}

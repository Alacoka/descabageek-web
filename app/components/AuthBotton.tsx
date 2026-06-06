"use client";

import { useState, useEffect } from "react";
import {
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function AuthButton() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Após o redirect do Google, o Firebase guarda o resultado temporariamente.
        // getRedirectResult() lê esse resultado no carregamento da página.
        getRedirectResult(auth).catch((error) => {
            console.error("Erro ao capturar resultado do login:", error);
        });

        // onAuthStateChanged trata tudo: redirect bem-sucedido, sessão persistida,
        // e logout — é a única fonte de verdade do estado do utilizador.
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        // signInWithRedirect redireciona o browser para o Google —
        // não há código a executar depois desta linha neste ciclo de vida.
        await signInWithRedirect(auth, provider);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Erro ao terminar sessão:", error);
        }
    };

    // Enquanto verifica a sessão persistida, não renderiza nada.
    // Evita o flash em que o botão "Login" aparece por um instante
    // antes de perceber que o utilizador já estava autenticado.
    if (loading) return null;

    if (user) {
        return (
            <div className="flex items-center gap-4">
                {user.photoURL && (
                    <img
                        src={user.photoURL}
                        alt="Perfil"
                        className="w-9 h-9 rounded-full border-2 border-purple-600 shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                    />
                )}
                <button
                    onClick={handleLogout}
                    className="text-xs font-semibold text-gray-400 hover:text-purple-400 transition-colors uppercase tracking-wider"
                >
                    Sair
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleLogin}
            className="hidden md:flex px-4 py-2 rounded-md border border-purple-800 text-sm font-semibold text-purple-300 hover:text-white hover:border-purple-500 hover:bg-purple-950/30 transition-all bg-transparent"
        >
            Login
        </button>
    );
}
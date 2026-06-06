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
        // 1. Tenta capturar o utilizador que voltou do redirect do Google
        getRedirectResult(auth)
            .then((result) => {
                // Se houver resultado, o onAuthStateChanged abaixo vai disparar
                // automaticamente e actualizar o estado — não precisamos de setUser aqui
                if (result?.user) {
                    console.log("Login via redirect bem-sucedido:", result.user.displayName);
                }
            })
            .catch((error) => {
                console.error("Erro no redirect de login:", error);
                setLoading(false); // garante que não fica preso no loading em caso de erro
            });

        // 2. Observa o estado de autenticação — esta é a fonte de verdade
        // Dispara tanto após redirect bem-sucedido como para sessões persistidas
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Erro ao terminar sessão:", error);
        }
    };

    if (loading) {
        // Placeholder com o mesmo tamanho do botão para evitar layout shift
        return (
            <div className="hidden md:block w-[72px] h-[36px] rounded-md bg-purple-950/20 animate-pulse" />
        );
    }

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
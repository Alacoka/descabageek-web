"use client";

import { useState, useEffect } from "react";
import {
    signInWithPopup,
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
        // onAuthStateChanged é a única fonte de verdade —
        // dispara ao carregar a página com sessão persistida, após login e após logout
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            // onAuthStateChanged detecta o novo utilizador automaticamente
        } catch (error) {
            console.error("Erro ao iniciar sessão com o Google:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Erro ao terminar sessão:", error);
        }
    };

    // Placeholder animado enquanto verifica a sessão — evita flash de layout
    if (loading) {
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
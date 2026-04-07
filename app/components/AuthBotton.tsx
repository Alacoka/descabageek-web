"use client";

import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function AuthButton() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
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

    // Se o utilizador estiver autenticado, mostra o perfil
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

    // Se não estiver autenticado, mostra o botão original de Login
    return (
        <button
            onClick={handleLogin}
            className="hidden md:flex px-4 py-2 rounded-md border border-purple-800 text-sm font-semibold text-purple-300 hover:text-white hover:border-purple-500 hover:bg-purple-950/30 transition-all bg-transparent"
        >
            Login
        </button>
    );
}
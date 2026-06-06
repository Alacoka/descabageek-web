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
        // auth só é null se as env vars não estiverem configuradas
        if (!auth) {
            setLoading(false);
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        if (!auth) return;
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
        } catch (error) {
            console.error("Erro ao iniciar sessão com o Google:", error);
        }
    };

    const handleLogout = async () => {
        if (!auth) return;
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Erro ao terminar sessão:", error);
        }
    };

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
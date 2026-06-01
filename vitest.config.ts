import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    test: {
        // Expõe expect, describe, it, vi, etc. globalmente — necessário para o jest-dom
        globals: true,

        // Simula o DOM do browser (necessário para @testing-library/react)
        environment: "jsdom",

        // Roda este arquivo antes de cada teste — configura matchers do testing-library
        setupFiles: ["./vitest.setup.ts"],

        // Inclui apenas arquivos de teste dentro de app/, lib/ e components/
        include: ["app/**/*.test.{ts,tsx}", "lib/**/*.test.{ts,tsx}"],

        // Cobertura de código (rodar com: npm run test:coverage)
        coverage: {
            provider: "v8",
            reporter: ["text", "html"],
            include: ["app/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
            exclude: ["**/*.test.{ts,tsx}", "**/node_modules/**"],
        },

        // Desativa threads para maior compatibilidade com Firebase SDK
        pool: "forks",
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "."),
        },
    },
});
/**
 * Exemplos de testes para o DescabaGeek.
 *
 * Este arquivo mostra os padrões a seguir para testar:
 *  - Funções utilitárias puras (lib/)
 *  - Componentes React (app/)
 *  - Chamadas de API mockadas
 *
 * Para rodar: npm test
 * Para cobertura: npm run test:coverage
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

// ─── Exemplo 1: teste de função utilitária ─────────────────────────────────
// Adapte para as funções reais em lib/ (formatação de data, slugify, etc.)

// Simula uma função que existe no projeto — ajuste o import para o caminho real
// import { formatDate, getCategoryColor } from "@/lib/utils";

function formatDate(isoString: string): string {
    return new Date(isoString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

describe("formatDate", () => {
    it("formata data ISO para português", () => {
        expect(formatDate("2025-06-15T00:00:00Z")).toContain("junho");
    });

    it("retorna string não vazia para qualquer data válida", () => {
        expect(formatDate("2024-01-01T00:00:00Z")).toBeTruthy();
    });
});

// ─── Exemplo 2: cores de categoria ────────────────────────────────────────
// Adapte para a lógica real de categorias/tags do projeto

function getCategoryColor(category: string): string {
    const map: Record<string, string> = {
        tech: "blue",
        rpg: "purple",
        animes: "pink",
        filmes: "amber",
        games: "green",
    };
    return map[category.toLowerCase()] ?? "gray";
}

describe("getCategoryColor", () => {
    it("retorna a cor correta para cada categoria", () => {
        expect(getCategoryColor("tech")).toBe("blue");
        expect(getCategoryColor("RPG")).toBe("purple");
        expect(getCategoryColor("Animes")).toBe("pink");
    });

    it("retorna gray para categoria desconhecida", () => {
        expect(getCategoryColor("categoria-nova")).toBe("gray");
    });
});

// ─── Exemplo 3: teste de componente React ─────────────────────────────────
// Adapte para um componente real — ex: CategoryBadge, PostCard, HeroPost

type BadgeProps = { label: string; color?: string };

function CategoryBadge({ label, color = "gray" }: BadgeProps) {
    return (
        <span data-testid="badge" className={`badge badge-${color}`}>
            {label}
        </span>
    );
}

describe("CategoryBadge", () => {
    it("renderiza o label corretamente", () => {
        render(<CategoryBadge label="Tech" color="blue" />);
        expect(screen.getByTestId("badge")).toHaveTextContent("Tech");
    });

    it("aplica a classe de cor correta", () => {
        render(<CategoryBadge label="RPG" color="purple" />);
        expect(screen.getByTestId("badge")).toHaveClass("badge-purple");
    });

    it("usa gray como cor padrão quando não passada", () => {
        render(<CategoryBadge label="Games" />);
        expect(screen.getByTestId("badge")).toHaveClass("badge-gray");
    });
});

// ─── Exemplo 4: mock de fetch para chamadas à API do Strapi ───────────────
// Adapte para as funções reais de fetch em lib/api.ts

const mockPost = {
    id: 1,
    attributes: {
        title: "Next.js 16 lançado",
        slug: "nextjs-16-lancado",
        publishedAt: "2025-06-01T10:00:00Z",
    },
};

describe("API do Strapi (mockada)", () => {
    beforeEach(() => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ data: [mockPost] }),
            })
        );
    });

    it("busca e retorna posts corretamente", async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
        const json = await res.json();
        expect(json.data).toHaveLength(1);
        expect(json.data[0].attributes.title).toBe("Next.js 16 lançado");
    });

    it("lida com resposta vazia", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ data: [] }),
            })
        );
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
        const json = await res.json();
        expect(json.data).toHaveLength(0);
    });
});
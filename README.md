# DescabaGeek — Frontend

> Portal de Cultura Pop construído com arquitetura Headless CMS.

🔗 **Site:** [www.descabageek.com](https://www.descabageek.com)

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS v4 |
| Autenticação | Firebase Auth (Google) |
| Hosting | Vercel |
| API de conteúdos | Strapi (descabageek-admin) |

---

## Variáveis de ambiente

Copia o `.env.local.example` para `.env.local` e preenche os valores:

```bash
cp .env.local.example .env.local
```

| Variável | Onde encontrar |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL do backend Strapi no Render |
| `STRAPI_HOSTNAME` | Só o hostname (sem https://) do Render |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Console → Project Settings → Web App |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Idem (ex: `projecto-abc.firebaseapp.com`) |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Idem |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Idem |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Idem |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Idem |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Idem (GA4) |

> As variáveis `NEXT_PUBLIC_*` são expostas no bundle do cliente — não colocar segredos nelas.
> O `STRAPI_HOSTNAME` é apenas para servidor e nunca é exposto ao cliente.

---

## Correr localmente

```bash
# Instalar dependências
npm install

# Iniciar em desenvolvimento
npm run dev
```

O site fica disponível em `http://localhost:3000`.

Para apontar para o backend local do Strapi, define em `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:1337
STRAPI_HOSTNAME=localhost
```

---

## Scripts disponíveis

```bash
npm run dev          # servidor de desenvolvimento
npm run build        # build de produção
npm run start        # servidor de produção
npm run lint         # verificar erros de linting
npm test             # correr testes (Vitest)
npm run test:watch   # testes em modo watch
npm run test:coverage # relatório de cobertura
```

---

## Estrutura de pastas

```
app/
  components/     # componentes React reutilizáveis
  post/[slug]/    # página de detalhe de post
  page.tsx        # página principal (feed)
  layout.tsx      # layout global (header, footer)
  sitemap.ts      # sitemap dinâmico para SEO
  robots.ts       # regras para crawlers
lib/
  firebase.ts     # inicialização do Firebase
  utils.ts        # funções utilitárias (formatarData, getCategoryColor, etc.)
public/           # assets estáticos
```

---

Desenvolvido por Kawã Alacoque.
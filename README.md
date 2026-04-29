# DescabaGeek

> **Portal de Cultura Pop, RPG e Tecnologia desenvolvido com arquitetura Full-Stack moderna (Headless CMS).**

🔗 **Acesso ao Projeto (Front-end):** [https://descabageek.vercel.app](https://descabageek.vercel.app)  

---

## 💻 Sobre o Projeto

O **DescabaGeek** é um portal dinâmico desenhado para a comunidade geek e tech. O principal objetivo deste projeto foi construir uma aplicação web robusta, rápida e totalmente gerível através de uma arquitetura desacoplada, separando completamente a camada de apresentação (Front-end) da camada de gestão de conteúdos (Back-end).

O layout conta com um *Dark Mode* nativo e elementos "cyberpunk", garantindo uma leitura confortável e uma identidade visual focada no público *gamer*.

## 🛠️ Stack Tecnológica

Este projeto foi construído utilizando as ferramentas mais modernas do mercado para garantir performance, escalabilidade e segurança:

### Front-end (Camada de Apresentação)
* **[Next.js](https://nextjs.org/)** - Framework React com App Router.
* **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para maior segurança no código.
* **[Tailwind CSS](https://tailwindcss.com/)** - Estilização utilitária, responsiva e focada em performance.
* **[Firebase Auth](https://firebase.google.com/)** - Autenticação de utilizadores (Google Login).
* **[Vercel](https://vercel.com/)** - Hospedagem e CI/CD do Front-end.

### Back-end & Infraestrutura (Headless CMS)
* **[Strapi](https://strapi.io/)** - Sistema de gestão de conteúdos (Node.js) a fornecer dados via REST API.
* **[PostgreSQL (Supabase)](https://supabase.com/)** - Banco de dados relacional na nuvem.
* **[Cloudinary](https://cloudinary.com/)** - CDN e armazenamento externo blindado para imagens e mídias.
* **[Render](https://render.com/)** - Hospedagem do servidor Node.js/Strapi.

---

## ✨ Principais Funcionalidades

* 📰 **Feed Dinâmico de Notícias:** Consumo de API RESTful em tempo real.
* 🏆 **Post Herói (Destaque):** Algoritmo que separa a matéria mais recente para destaque visual no topo da página.
* 📢 **Sistema de Banners Publicitários:** Lógica de identificação nativa para renderizar espaços patrocinados automaticamente.
* 🏷️ **Categorização por Cores:** Tags dinâmicas e coloridas baseadas no tema do post (Tech, RPG, Animes, Filmes, etc).
* 🛡️ **Painel Administrativo:** Interface completa para criar, editar, apagar e publicar matérias sem mexer numa única linha de código.
* ☁️ **Upload para a Nuvem:** Imagens das matérias são automaticamente enviadas e servidas pelo Cloudinary, aliviando o servidor principal.

---

## 🚀 Como correr o projeto localmente

Para clonar e testar este projeto na sua máquina, vai precisar do [Node.js](https://nodejs.org/en/) instalado.

### 1. Front-end (Next.js)
```bash
# Clone o repositório
git clone [https://github.com/SEU_USUARIO/descabageek-web.git](https://github.com/SEU_USUARIO/descabageek-web.git)

# Entre na pasta
cd descabageek-web

# Instale as dependências
npm install

# Crie um ficheiro .env.local e adicione a variável da API
# NEXT_PUBLIC_API_URL=http://localhost:1337 (Para testar local)

# Inicie o servidor
npm run dev

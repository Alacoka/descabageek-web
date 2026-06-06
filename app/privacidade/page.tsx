import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Política de Privacidade | DescabaGeek",
    description: "Entenda como o DescabaGeek coleta, usa e protege dados pessoais.",
};

const sections = [
    {
        title: "1. Dados que coletamos",
        content: [
            "Quando você usa o formulário de contato, podemos receber seu nome, e-mail, mensagem e dados técnicos necessários para processar o envio.",
            "Quando você faz login com Google, o Firebase Authentication pode nos fornecer dados básicos da sua conta, como nome, e-mail, foto de perfil e identificador da conta.",
            "Também podemos coletar dados de uso e desempenho por meio do Firebase Analytics, como páginas acessadas, eventos de navegação, dispositivo, navegador e informações aproximadas de localização.",
        ],
    },
    {
        title: "2. Como usamos os dados",
        content: [
            "Usamos os dados para responder mensagens enviadas pelo formulário de contato, administrar recursos de login, melhorar a experiência no site, analisar audiência e manter a segurança da aplicação.",
            "Não vendemos dados pessoais. Compartilhamentos podem ocorrer apenas com provedores necessários para operar o site, cumprir obrigações legais ou proteger direitos do DescabaGeek e de seus usuários.",
        ],
    },
    {
        title: "3. Serviços de terceiros",
        content: [
            "O formulário de contato é processado pelo Formspree. O login, autenticação e métricas podem ser processados pelo Firebase e por serviços Google.",
            "Links externos, como YouTube e outros sites mencionados no conteúdo, possuem políticas próprias. Ao sair do DescabaGeek, recomendamos consultar as regras de privacidade do serviço acessado.",
        ],
    },
    {
        title: "4. Cookies e tecnologias similares",
        content: [
            "Podemos usar cookies, armazenamento local e identificadores similares para manter sessões de login, medir uso da aplicação, prevenir abuso e melhorar o desempenho do site.",
            "Você pode ajustar permissões de cookies e dados do site nas configurações do seu navegador, sabendo que alguns recursos podem deixar de funcionar corretamente.",
        ],
    },
    {
        title: "5. Segurança e retenção",
        content: [
            "Adotamos medidas razoáveis para proteger as informações tratadas pela aplicação, mas nenhum sistema conectado à internet é totalmente imune a riscos.",
            "Mantemos dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, atender solicitações, resolver disputas ou cumprir exigências legais.",
        ],
    },
    {
        title: "6. Seus direitos",
        content: [
            "Você pode solicitar confirmação de tratamento, acesso, correção, exclusão, portabilidade ou informações sobre uso compartilhado de dados, conforme a legislação aplicável.",
            "Para exercer seus direitos, entre em contato pelo e-mail contato@descabageek.com. Podemos solicitar informações adicionais para confirmar sua identidade antes de atender ao pedido.",
        ],
    },
    {
        title: "7. Alterações nesta política",
        content: [
            "Esta política pode ser atualizada para refletir mudanças no site, nos serviços usados ou na legislação. A versão vigente será sempre publicada nesta página.",
        ],
    },
];

export default function PrivacidadePage() {
    return (
        <main className="min-h-screen px-6 py-10 md:px-12 md:py-14 max-w-5xl mx-auto text-white selection:bg-purple-500/30">
            <Link href="/" className="text-purple-500 font-bold mb-8 inline-flex items-center gap-2 hover:text-cyan-400 transition-colors uppercase tracking-widest text-xs">
                <span className="text-lg leading-none">&larr;</span> Voltar para o Início
            </Link>

            <header className="mb-12 border-b border-purple-900/30 pb-8">
                <p className="text-cyan-400 text-xs font-black uppercase tracking-[0.24em] mb-4">
                    Transparência e dados pessoais
                </p>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
                    Política de Privacidade
                </h1>
                <p className="text-gray-400 mt-5 font-medium text-base md:text-lg leading-relaxed max-w-3xl">
                    Esta política explica quais dados pessoais podem ser coletados pelo DescabaGeek, como eles são usados e quais canais você pode acionar para falar conosco.
                </p>
                <p className="text-gray-500 mt-4 text-sm font-semibold">
                    Última atualização: 6 de junho de 2026.
                </p>
            </header>

            <div className="space-y-10">
                {sections.map((section) => (
                    <section key={section.title} className="border-b border-purple-900/20 pb-8 last:border-b-0">
                        <h2 className="text-2xl md:text-3xl font-black text-cyan-400 uppercase tracking-tight mb-5">
                            {section.title}
                        </h2>
                        <div className="space-y-4 text-gray-300 leading-8 font-medium">
                            {section.content.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <section className="mt-12 border border-purple-900/40 bg-[#0a021c] p-6 md:p-8 rounded-2xl">
                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-3">
                    Contato
                </h2>
                <p className="text-gray-300 leading-8 font-medium">
                    Para dúvidas sobre privacidade ou solicitações relacionadas aos seus dados, envie uma mensagem para{" "}
                    <a href="mailto:contato@descabageek.com" className="text-cyan-400 hover:text-purple-300 transition-colors">
                        contato@descabageek.com
                    </a>
                    .
                </p>
            </section>
        </main>
    );
}

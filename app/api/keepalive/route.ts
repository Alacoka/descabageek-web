import { NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'https://descabageek-admin.onrender.com';

// Esta rota é chamada periodicamente para manter o servidor Strapi no Render ativo.
// O plano gratuito do Render suspende o servidor após 15min de inatividade,
// causando cold starts de até 60s na primeira visita.
//
// Para ativar, configura um cron job externo (ex: cron-job.org, UptimeRobot)
// para fazer GET a https://www.descabageek.com/api/keepalive a cada 10 minutos.
export async function GET() {
    try {
        const res = await fetch(`${STRAPI_URL}/api/posts?pagination[limit]=1`, {
            cache: 'no-store',
        });

        if (res.ok) {
            return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
        }

        return NextResponse.json(
            { status: 'error', message: 'Strapi não respondeu' },
            { status: 502 }
        );
    } catch {
        return NextResponse.json(
            { status: 'error', message: 'Falha ao contactar Strapi' },
            { status: 503 }
        );
    }
}
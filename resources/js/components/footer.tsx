import { Link } from '@inertiajs/react';
import { Cookie, ExternalLink, FileText } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="mt-16 border-t border-border/40 bg-background/80 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Línea 1: enlaces legales */}
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <Link href="/aviso-legal" className="inline-flex items-center gap-2 transition hover:text-foreground">
                        <FileText className="h-4 w-4" />
                        Aviso legal y política de privacidad
                    </Link>
                    <span className="mx-2 opacity-40">·</span>
                    <Link href="/politica-de-cookies" className="inline-flex items-center gap-2 transition hover:text-foreground">
                        <Cookie className="h-4 w-4" />
                        Política de cookies
                    </Link>
                    <span className="mx-2 opacity-40">·</span>
                    <a
                        href="https://seisida.net"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 transition hover:text-foreground"
                    >
                        SEISIDA
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                </div>

                {/* Línea 2: info institucional */}
                <div className="mt-4 flex flex-col items-center gap-1 text-xs text-muted-foreground sm:flex-row sm:justify-between">
                    <p className="text-center sm:text-left">© {new Date().getFullYear()} GEEVIH – Grupo de Enfermería Experta en VIH</p>

                    <p className="text-center sm:text-right">Grupo integrado en SEISIDA</p>
                </div>
            </div>
        </footer>
    );
}

import { Link } from '@inertiajs/react';
import { Code, Cookie, ExternalLink, FileText } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Línea 1: legales + crédito */}
                <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground xl:flex-row xl:items-center xl:justify-between">
                    {/* Enlaces legales */}
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 xl:justify-start">
                        <Link href="/aviso-legal" className="inline-flex items-center gap-2 transition hover:text-primary">
                            <FileText className="h-4 w-4" />
                            <span>Aviso legal y política de privacidad</span>
                        </Link>

                        <span className="hidden opacity-40 sm:inline">·</span>

                        <Link href="/politica-de-cookies" className="inline-flex items-center gap-2 transition hover:text-primary">
                            <Cookie className="h-4 w-4" />
                            <span>Política de cookies</span>
                        </Link>

                        <span className="hidden opacity-40 sm:inline">·</span>

                        <a
                            href="https://seisida.net"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-2 transition hover:text-primary"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>SEISIDA</span>
                        </a>
                    </div>

                    {/* Crédito */}
                    <a
                        href="https://oleksandrpopov.dev"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center justify-center gap-2 text-xs text-muted-foreground/75 transition hover:text-primary"
                    >
                        <Code className="h-3.5 w-3.5" />
                        <span>Desarrollo web: Oleksandr Popov</span>
                    </a>
                </div>

                {/* Línea 2: info institucional */}
                <div className="mt-4 flex flex-col items-center gap-1 text-center text-xs text-muted-foreground md:flex-row md:justify-between md:text-left">
                    <p>© {new Date().getFullYear()} GEEVIH – Grupo de Enfermería Experta en VIH</p>

                    <p>Grupo integrado en SEISIDA</p>
                </div>
            </div>
        </footer>
    );
}

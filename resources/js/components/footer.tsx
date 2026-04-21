import { Link } from '@inertiajs/react';
import { Cookie, ExternalLink, FileText, Mail, Shield } from 'lucide-react';

export default function Footer() {
    const navigationLinks = [
        { label: 'Sobre GEEVIH', href: '/sobre' },
        { label: 'Áreas de trabajo', href: '/areas' },
        // { label: 'Formación', href: '/formacion' },
        // { label: 'Recursos', href: '/recursos' },
        { label: 'Noticias', href: '/noticias' },
        { label: 'Contacto', href: '/contacto' },
    ];

    const legalLinks = [
        { label: 'Aviso legal y privacidad', href: '/aviso-legal', icon: FileText },
        { label: 'Política de cookies', href: '/politica-de-cookies', icon: Cookie },
    ];

    return (
        <footer className="mt-20 bg-muted/35">
            <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
                <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.2fr_0.9fr_0.9fr]">
                    <div className="max-w-md space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                                G
                            </div>

                            <div>
                                <p className="font-headline text-lg font-semibold tracking-tight text-foreground">GEEVIH</p>
                                <p className="text-sm text-muted-foreground">Grupo de Enfermería Experta en VIH</p>
                            </div>
                        </div>

                        <p className="text-sm leading-6 text-muted-foreground">
                            Espacio de referencia para la formación, los recursos y la actualidad del cuidado enfermero experto en VIH.
                        </p>

                        <a
                            href="mailto:info@geevih.seisida.es"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80"
                        >
                            <Mail className="h-4 w-4" />
                            geevih@seisida.net
                        </a>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-[0.14em] text-foreground/80 uppercase">Navegación</h3>

                        <nav className="mt-4 grid gap-3">
                            {navigationLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition hover:text-foreground">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-[0.14em] text-foreground/80 uppercase">Información</h3>

                        <nav className="mt-4 grid gap-3">
                            {legalLinks.map((link) => {
                                const Icon = link.icon;

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
                                    >
                                        <Icon className="h-4 w-4" />
                                        {link.label}
                                    </Link>
                                );
                            })}

                            <a
                                href="https://seisida.es"
                                target="_blank"
                                rel="noreferrer noopener"

                                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
                            >
                                <Shield className="h-4 w-4" />
                                SEISIDA
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        </nav>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-border/50 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()} GEEVIH. Todos los derechos reservados.</p>
                    <p>Grupo de trabajo integrado en SEISIDA.</p>
                </div>
            </div>
        </footer>
    );
}

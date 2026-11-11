import { siteButtonVariants } from '@/components/site-button';
import { Card } from '@/components/ui/card';
import { ExternalLink, Globe } from 'lucide-react';

interface LinksCardProps {
    href: string;
    titulo: string;
    descripcion?: string | null;
    imagen?: string | null;
    is_pinned?: boolean;
}

export default function LinkCard({ href, titulo, descripcion, imagen }: LinksCardProps) {
    const imageSrc = imagen?.trim();
    const available = Boolean(href?.trim() && href.trim() !== '#');
    const card = (
        <Card className={available ? 'site-card-interactive' : undefined}>
            <div className="grid h-full grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)]">
                <div className="flex items-center justify-center bg-muted p-6">
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt={'Logo o imagen de ' + titulo}
                            loading="lazy"
                            decoding="async"
                            className="h-48 w-48 rounded-xl bg-white object-contain p-4"
                        />
                    ) : (
                        <Globe aria-hidden="true" className="h-16 w-16 text-primary" />
                    )}
                </div>
                <div className="site-card-body min-w-0">
                    <h3 className="site-card-title">{titulo}</h3>
                    {descripcion && <p className="mt-3 site-card-description">{descripcion}</p>}
                    {available && (
                        <div className="site-card-footer">
                            <span className={siteButtonVariants({ variant: 'secondary' })}>
                                Visitar sitio
                                <ExternalLink aria-hidden="true" />
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );

    return available ? (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="site-card-link"
            aria-label={'Visitar sitio: ' + titulo + ' (se abre en una pestaña nueva)'}
        >
            {card}
        </a>
    ) : (
        card
    );
}

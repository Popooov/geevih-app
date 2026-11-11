import { siteButtonVariants } from '@/components/site-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ExternalLink, FileText } from 'lucide-react';

interface RecursoCardProps {
    titulo: string;
    tipo: string;
    fecha: string;
    descripcion?: string | null;
    enlace?: string | null;
    imagen?: string | null;
    is_pinned?: boolean;
}

export default function ResourceCard({ titulo, fecha, descripcion, enlace, imagen }: RecursoCardProps) {
    const href = enlace?.trim();
    const available = Boolean(href && href !== '#');
    const imageSrc = imagen?.trim();
    const card = (
        <Card className={available ? 'site-card-interactive' : undefined}>
            <div className="relative aspect-video overflow-hidden bg-muted">
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={'Imagen del recurso: ' + titulo}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain"
                    />
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                        <FileText aria-hidden="true" className="h-8 w-8" />
                        <span className="text-sm">Documento</span>
                    </div>
                )}
            </div>
            <CardHeader className="site-card-body space-y-3 pb-0 sm:pb-0">
                {fecha && (
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar aria-hidden="true" className="h-4 w-4 shrink-0" />
                        {fecha}
                    </p>
                )}
                <CardTitle>{titulo}</CardTitle>
                {descripcion && <p className="line-clamp-3 site-card-description">{descripcion}</p>}
            </CardHeader>
            <CardContent className="site-card-footer p-5 pt-6 sm:p-6">
                {available ? (
                    <span className={siteButtonVariants({ variant: 'secondary' })}>
                        Abrir recurso
                        <ExternalLink aria-hidden="true" />
                    </span>
                ) : (
                    <p className="site-card-description">Recurso no disponible</p>
                )}
            </CardContent>
        </Card>
    );

    return available && href ? (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={'Abrir recurso: ' + titulo + ' (se abre en una pestaña nueva)'}
            className="site-card-link"
        >
            {card}
        </a>
    ) : (
        card
    );
}

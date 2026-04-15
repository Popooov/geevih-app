import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ExternalLink, FileText, Pin } from 'lucide-react';

interface RecursoCardProps {
    titulo: string;
    tipo: string;
    fecha: string;
    descripcion?: string | null;
    enlace?: string | null;
    imagen?: string | null;
    is_pinned?: boolean;
}

export default function ResourceCard({ titulo, tipo, fecha, descripcion, enlace, imagen, is_pinned = false }: RecursoCardProps) {
    const href = enlace?.trim() || undefined;
    const isAvailable = Boolean(href);
    const imageSrc = imagen?.trim() ? imagen : null;

    const card = (
        <Card
            className={[
                'relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border-0 bg-background/95 shadow-[0_20px_60px_rgba(175,16,26,0.06)] transition-all duration-300',
                'animate-in fade-in slide-in-from-bottom-8 motion-reduce:transform-none motion-reduce:animate-none',
                isAvailable ? 'hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(175,16,26,0.12)]' : 'opacity-80',
            ].join(' ')}
        >
            <div className="absolute inset-x-0 top-0 h-1 bg-primary/80" />

            <div className="relative h-48 w-full overflow-hidden bg-muted/40">
                {imageSrc ? (
                    <>
                        <img
                            src={imageSrc}
                            alt={`Imagen del recurso: ${titulo}`}
                            className={[
                                'h-full w-full object-cover transition-transform duration-500',
                                isAvailable ? 'group-hover:scale-[1.04]' : '',
                            ].join(' ')}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center bg-muted/50">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <FileText className="h-6 w-6" />
                            <span className="text-sm font-medium">Documento</span>
                        </div>
                    </div>
                )}

                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-primary uppercase backdrop-blur">
                        {tipo}
                    </span>

                    {is_pinned ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-white uppercase">
                            <Pin className="h-3.5 w-3.5" />
                            Fijado
                        </span>
                    ) : null}
                </div>
            </div>

            <CardHeader className="flex flex-grow flex-col space-y-4 p-6 pb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{fecha || 'Sin fecha'}</span>
                </div>

                <CardTitle className="line-clamp-2 text-xl leading-snug font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                    {titulo}
                </CardTitle>

                {descripcion ? <p className="line-clamp-3 text-sm leading-7 text-muted-foreground">{descripcion}</p> : null}
            </CardHeader>

            <CardContent className="p-6 pt-0">
                {isAvailable ? (
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3">
                        <ExternalLink className="h-4 w-4" />
                        Abrir recurso
                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </div>
                ) : (
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        Recurso no disponible
                    </div>
                )}
            </CardContent>
        </Card>
    );

    return isAvailable ? (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Abrir recurso: ${titulo}`} className="group block h-full">
            {card}
        </a>
    ) : (
        <div className="group block h-full cursor-default">{card}</div>
    );
}

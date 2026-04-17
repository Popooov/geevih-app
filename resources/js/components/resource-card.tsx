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
                'group relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-[1.75rem] border-0 bg-background/95',
                'shadow-[0_18px_50px_rgba(175,16,26,0.06)] ring-1 ring-black/5 transition-all duration-300',
                'dark:bg-neutral-950 dark:shadow-[0_18px_50px_rgba(175,16,26,0.08)] dark:ring-white/10',
                isAvailable ? 'hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(175,16,26,0.12)]' : 'opacity-85',
            ].join(' ')}
        >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-primary/70" />

            <div className="relative h-44 overflow-hidden bg-muted/35 dark:bg-neutral-900">
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
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <div className="flex items-center gap-2 text-muted-foreground dark:text-neutral-400">
                            <FileText className="h-6 w-6" />
                            <span className="text-sm font-medium">Documento</span>
                        </div>
                    </div>
                )}

                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-neutral-800 uppercase shadow-sm backdrop-blur dark:bg-neutral-100 dark:text-neutral-900">
                            {tipo}
                        </span>

                        {is_pinned ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-white uppercase shadow-sm dark:bg-white dark:text-neutral-900">
                                <Pin className="h-3.5 w-3.5" />
                                Fijado
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>

            <CardHeader className="flex flex-1 flex-col space-y-4 p-6 pb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-neutral-400">
                    <Calendar className="h-4 w-4" />
                    <span>{fecha || 'Sin fecha'}</span>
                </div>

                <CardTitle className="line-clamp-2 min-h-[3.25rem] text-xl font-semibold leading-7 tracking-tight text-foreground">{titulo}</CardTitle>

                <div className="min-h-[4.75rem]">
                    {descripcion ? (
                        <p className="line-clamp-3 text-sm leading-7 text-muted-foreground dark:text-neutral-400">{descripcion}</p>
                    ) : (
                        <p className="text-sm leading-7 text-transparent select-none">.</p>
                    )}
                </div>
            </CardHeader>

            <CardContent className="mt-auto p-6 pt-0">
                {isAvailable ? (
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3">
                        <ExternalLink className="h-4 w-4" />
                        Abrir recurso
                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </div>
                ) : (
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground dark:text-neutral-400">
                        <FileText className="h-4 w-4" />
                        Recurso no disponible
                    </div>
                )}
            </CardContent>
        </Card>
    );

    return isAvailable ? (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Abrir recurso: ${titulo}`} className="block h-full">
            {card}
        </a>
    ) : (
        <div className="block h-full cursor-default">{card}</div>
    );
}

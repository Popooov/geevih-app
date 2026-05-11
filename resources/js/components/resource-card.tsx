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
    const href = enlace?.trim() || undefined;
    const isAvailable = Boolean(href);
    const imageSrc = imagen?.trim() ? imagen : null;

    const card = (
        <Card
            className={[
                'group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-[1.5rem] border-0 bg-white/95',
                'shadow-[0_18px_50px_rgba(175,16,26,0.045)] ring-1 ring-black/[0.045] transition-all duration-300',
                'dark:bg-neutral-950 dark:shadow-[0_18px_50px_rgba(175,16,26,0.08)] dark:ring-white/10',
                isAvailable ? 'hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(175,16,26,0.11)]' : 'opacity-85',
            ].join(' ')}
        >
            <div className="relative h-36 overflow-hidden bg-neutral-50 dark:bg-neutral-900 sm:h-40">
                {imageSrc ? (
                    <>
                        <img
                            src={imageSrc}
                            alt={`Imagen del recurso: ${titulo}`}
                            className={[
                                'h-full w-full object-cover object-center transition-transform duration-500',
                                isAvailable ? 'group-hover:scale-[1.04]' : '',
                            ].join(' ')}
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/10 dark:to-neutral-950/20" />
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <div className="flex flex-col items-center gap-2 text-neutral-500 dark:text-neutral-400">
                            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04] dark:bg-neutral-950 dark:ring-white/10">
                                <FileText className="h-4 w-4" />
                            </div>
                            <span className="text-[11px] font-medium">Documento</span>
                        </div>
                    </div>
                )}
            </div>

            <CardHeader className="flex flex-1 flex-col space-y-3.5 p-5 pb-4 sm:p-6 sm:pb-4">
                {fecha ? (
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground dark:text-neutral-400">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{fecha}</span>
                    </div>
                ) : null}

                <CardTitle className="text-[15px] font-semibold leading-[1.35] tracking-tight text-neutral-950 transition-colors duration-300 group-hover:text-primary dark:text-white sm:text-base">
                    {titulo}
                </CardTitle>

                {descripcion ? (
                    <p className="line-clamp-2 text-sm leading-6 text-muted-foreground dark:text-neutral-400">{descripcion}</p>
                ) : null}
            </CardHeader>

            <CardContent className="mt-auto p-5 pt-0 sm:p-6 sm:pt-0">
                {isAvailable ? (
                    <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3.5 py-2 text-xs font-semibold text-neutral-900 transition-all duration-300 group-hover:bg-primary group-hover:text-white dark:bg-neutral-900 dark:text-neutral-100">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Abrir recurso
                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </div>
                ) : (
                    <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3.5 py-2 text-xs font-semibold text-muted-foreground dark:bg-neutral-900 dark:text-neutral-400">
                        <FileText className="h-3.5 w-3.5" />
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
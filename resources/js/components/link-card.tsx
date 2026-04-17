import { Card } from '@/components/ui/card';
import { ExternalLink, Globe } from 'lucide-react';

interface LinksCardProps {
    href: string;
    titulo: string;
    descripcion?: string | null;
    imagen?: string | null;
    is_pinned?: boolean;
}

export default function LinkCard({ href, titulo, descripcion, imagen, is_pinned = false }: LinksCardProps) {
    const imageSrc = imagen?.trim() ? imagen : null;

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="group block w-full" aria-label={`Abrir enlace: ${titulo}`}>
            <Card
                className={[
                    'overflow-hidden rounded-[1.9rem] border-0 bg-background/95',
                    'shadow-[0_18px_50px_rgba(175,16,26,0.06)] ring-1 ring-black/5 transition-all duration-300',
                    'dark:bg-neutral-950 dark:shadow-[0_18px_50px_rgba(175,16,26,0.08)] dark:ring-white/10',
                    'hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(175,16,26,0.12)]',
                ].join(' ')}
            >
                <div className="grid min-h-[240px] grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)]">
                    <div className="relative flex items-center justify-center bg-muted/35 p-8 dark:bg-neutral-900">
                        {imageSrc ? (
                            <img
                                src={imageSrc}
                                alt={`Logo o imagen del enlace: ${titulo}`}
                                className="h-32 w-32 rounded-[1.6rem] bg-white object-contain p-4 shadow-sm transition-transform duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <div className="flex h-32 w-32 items-center justify-center rounded-[1.6rem] bg-background text-primary shadow-sm dark:bg-neutral-800">
                                <Globe className="h-10 w-10" />
                            </div>
                        )}
                    </div>

                    <div className="flex min-w-0 flex-col p-6 md:p-7">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex rounded-full bg-neutral-200 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-neutral-800 uppercase dark:bg-neutral-800 dark:text-neutral-100">
                                    Enlace de interés
                                </span>

                                {is_pinned ? (
                                    <span className="inline-flex rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-white uppercase dark:bg-white dark:text-neutral-900">
                                        Destacado
                                    </span>
                                ) : null}
                            </div>

                            <div className="shrink-0 pt-1 text-muted-foreground transition-colors duration-300 group-hover:text-primary dark:text-neutral-400">
                                <ExternalLink className="h-5 w-5" />
                            </div>
                        </div>

                        <div className="mt-5 min-w-0 flex-1 space-y-4">
                            <h3 className="line-clamp-2 text-3xl font-semibold tracking-tight text-foreground md:text-[1.75rem] md:leading-9">
                                {titulo}
                            </h3>

                            <div className="min-h-[5.5rem]">
                                {descripcion ? (
                                    <p className="line-clamp-3 text-sm leading-8 text-muted-foreground md:text-base dark:text-neutral-400">
                                        {descripcion}
                                    </p>
                                ) : (
                                    <p className="text-sm leading-8 text-transparent select-none">.</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-foreground transition-all duration-300 group-hover:gap-3 dark:text-white">
                            <ExternalLink className="h-5 w-5 text-primary" />
                            <span>Visitar sitio</span>
                            <span className="transition-transform group-hover:translate-x-0.5">→</span>
                        </div>
                    </div>
                </div>
            </Card>
        </a>
    );
}

import { Card } from '@/components/ui/card';
import { ExternalLink, Globe } from 'lucide-react';

interface LinksCardProps {
    href: string;
    titulo: string;
    descripcion?: string | null;
    imagen?: string | null;
    is_pinned?: boolean;
}

export default function LinkCard({ href, titulo, descripcion, imagen, is_pinned }: LinksCardProps) {
    const imageSrc = imagen?.trim() ? imagen : null;

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="group block h-full" aria-label={`Abrir enlace: ${titulo}`}>
            <Card
                className={[
                    'relative overflow-hidden rounded-[1.75rem] border-0 bg-background/95 shadow-[0_20px_60px_rgba(175,16,26,0.06)] transition-all duration-300',
                    'animate-in fade-in slide-in-from-bottom-8 motion-reduce:transform-none motion-reduce:animate-none',
                    'hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(175,16,26,0.12)]',
                ].join(' ')}
            >
                {is_pinned && (
                    <div className="absolute top-4 right-4 z-10 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold tracking-[0.15em] text-white uppercase">
                        Destacado
                    </div>
                )}
                <div className="grid min-h-[180px] md:grid-cols-[140px_minmax(0,1fr)]">
                    <div className="flex items-center justify-center bg-muted/35 p-6">
                        {imageSrc ? (
                            <img
                                src={imageSrc}
                                alt={`Logo o imagen del enlace: ${titulo}`}
                                className="h-20 w-20 rounded-2xl bg-white object-contain p-3 shadow-sm"
                            />
                        ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-background text-primary shadow-sm">
                                <Globe className="h-8 w-8" />
                            </div>
                        )}
                    </div>

                    <div className="flex items-start justify-between gap-4 p-6">
                        <div className="min-w-0 space-y-3">
                            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
                                Enlace de interés
                            </span>

                            <h3 className="line-clamp-2 text-xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                                {titulo}
                            </h3>

                            {descripcion ? <p className="line-clamp-3 text-sm leading-7 text-muted-foreground">{descripcion}</p> : null}

                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3">
                                <ExternalLink className="h-4 w-4" />
                                Visitar sitio
                                <span className="transition-transform group-hover:translate-x-0.5">→</span>
                            </div>
                        </div>

                        <div className="shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-primary" aria-hidden>
                            <ExternalLink className="h-5 w-5" />
                        </div>
                    </div>
                </div>
            </Card>
        </a>
    );
}

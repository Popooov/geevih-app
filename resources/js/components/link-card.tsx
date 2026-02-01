import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface LinksCardProps {
    href: string;
    titulo: string;
    descripcion?: string;
}

export default function LinkCard({ href, titulo, descripcion }: LinksCardProps) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="group block h-full" aria-label={`Abrir enlace: ${titulo}`}>
            <Card
                className={[
                    'overflow-hidden rounded-xl border border-border/70 bg-background shadow-sm transition-all duration-300',
                    'animate-in fade-in slide-in-from-bottom-8 motion-reduce:transform-none motion-reduce:animate-none',
                    'hover:-translate-y-1 hover:border-red-600/50 hover:shadow-xl hover:shadow-red-500/10 dark:hover:border-red-400/40',
                ].join(' ')}
            >
                <div className="flex items-start justify-between gap-4 p-6">
                    <div className="min-w-0 space-y-2">
                        <h3 className="line-clamp-2 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-400">
                            {titulo}
                        </h3>

                        {descripcion ? <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{descripcion}</p> : null}
                    </div>

                    <div
                        className="shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-400"
                        aria-hidden
                    >
                        <ExternalLink className="h-5 w-5" />
                    </div>
                </div>
            </Card>
        </a>
    );
}

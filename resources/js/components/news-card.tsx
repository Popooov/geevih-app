import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar } from 'lucide-react';

interface NoticiaCardProps {
    titulo: string;
    fecha: string;
    resumen: string;
    imagen?: string | null;
    enlace?: string | null;
}

export default function NewsCard({ titulo, fecha, resumen, imagen, enlace }: NoticiaCardProps) {
    const imageSrc = imagen?.trim() ? imagen : '/images/noticia-placeholder.jpg';
    const href = enlace?.trim() ? enlace : '#';

    // Acento VIH (rojo)
    const accentText = 'text-red-600 dark:text-red-400';
    const accentBorderHover = 'hover:border-red-600/40';
    const accentTitleHover = 'group-hover:text-red-600 dark:group-hover:text-red-400';
    const topBar = 'bg-red-600 dark:bg-red-500';

    return (
        <Link href={href} className="group block h-full">
            <article
                className={[
                    'relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm transition-all duration-300',
                    'animate-in fade-in slide-in-from-bottom-8 motion-reduce:transform-none motion-reduce:animate-none',
                    'hover:-translate-y-1 hover:shadow-xl',
                    accentBorderHover,
                ].join(' ')}
            >
                {/* Top bar (acento VIH) */}
                <div className={`h-1 w-full ${topBar}`} />

                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                    <img
                        src={imageSrc}
                        alt={titulo}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/noticia-placeholder.jpg';
                        }}
                    />

                    {/* Overlay on hover */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Date chip */}
                    <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-[11px] font-bold tracking-wider text-foreground shadow-sm backdrop-blur-md">
                            <Calendar className={`h-3 w-3 ${accentText}`} />
                            {fecha}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-grow flex-col space-y-4 p-6">
                    <h3
                        className={['line-clamp-2 text-xl leading-tight font-extrabold text-foreground transition-colors', accentTitleHover].join(
                            ' ',
                        )}
                    >
                        {titulo}
                    </h3>

                    <p className="line-clamp-3 text-sm leading-relaxed font-medium text-muted-foreground">{resumen}</p>

                    <div
                        className={[
                            'mt-auto inline-flex items-center gap-1 pt-2 text-sm font-bold transition-all group-hover:gap-3',
                            accentText,
                        ].join(' ')}
                    >
                        Leer más
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                </div>
            </article>
        </Link>
    );
}

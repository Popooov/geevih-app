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

    return (
        <Link href={href} className="group block h-full">
            <article className="h-full overflow-hidden rounded-[1.75rem] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-background hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:shadow-none dark:ring-white/10 dark:hover:bg-neutral-800">
                <div className="relative h-56 w-full overflow-hidden">
                    <img
                        src={imageSrc}
                        alt={titulo}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/noticia-placeholder.jpg';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-black/0 to-transparent" />
                </div>

                <div className="flex h-[calc(100%-14rem)] flex-col p-6">
                    <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase dark:text-zinc-400">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        {fecha}
                    </div>

                    <h3 className="mt-4 line-clamp-2 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary dark:text-white">
                        {titulo}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground dark:text-zinc-300">{resumen}</p>

                    <div className="mt-auto pt-6">
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                            Leer más
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}

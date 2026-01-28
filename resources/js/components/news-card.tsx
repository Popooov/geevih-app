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

    return (
        <Link href={enlace ?? '#'} className="group relative block">
            <div className="hover:shadow-1xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 animate-in fade-in slide-in-from-bottom-2 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-[11px] font-bold tracking-wider text-slate-700 shadow-sm backdrop-blur-md dark:bg-slate-900/90 dark:text-slate-300">
                            <Calendar className="h-3 w-3 text-red-600" />
                            {fecha}
                        </div>
                    </div>
                </div>

                <div className="space-y-4 p-6">
                    <h3 className="line-clamp-2 text-xl leading-tight font-bold text-slate-900 transition-colors group-hover:text-red-600 dark:text-white">
                        {titulo}
                    </h3>

                    <p className="line-clamp-3 text-sm leading-relaxed font-medium text-slate-600 dark:text-slate-400">{resumen}</p>

                    <div className="flex items-center gap-1 pt-2 text-sm font-bold text-red-600 transition-all group-hover:gap-3 dark:text-red-400">
                        Leer más
                        <ArrowRight className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

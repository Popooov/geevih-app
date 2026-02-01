import AppLayout from '@/layouts/app-layout';
import { type ShowNewsPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';

export default function Show() {
    const { singleNews } = usePage<ShowNewsPageProps>().props;

    const imageSrc = singleNews.imagen?.trim() ? singleNews.imagen : '/images/noticia-placeholder.jpg';

    return (
        <AppLayout>
            <Head title={singleNews.titulo} />

            <div className="mx-auto max-w-5xl space-y-8 px-6 py-10">
                {/* Top bar */}
                <div className="flex items-center justify-between gap-4">
                    <Link
                        href="/noticias"
                        prefetch
                        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-red-600 dark:hover:text-red-400"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver a noticias
                    </Link>

                    {singleNews.source_url && (
                        <a
                            href={singleNews.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-semibold text-foreground/90 transition hover:border-red-600/40 hover:text-red-600 dark:hover:border-red-400/30 dark:hover:text-red-400"
                        >
                            Ver fuente
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                </div>

                {/* Hero */}
                <article className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm">
                    <header className="relative">
                        {/* Image */}
                        <div className="relative h-64 w-full sm:h-80">
                            <img
                                src={imageSrc}
                                alt={`Imagen de ${singleNews.titulo}`}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = '/images/noticia-placeholder.jpg';
                                }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                            {/* Date chip */}
                            <div className="absolute top-4 left-4">
                                <div className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-[11px] font-bold tracking-wider text-slate-700 shadow-sm backdrop-blur-md dark:bg-slate-900/90 dark:text-slate-200">
                                    <Calendar className="h-3 w-3 text-red-600 dark:text-red-400" />
                                    {singleNews.fecha}
                                </div>
                            </div>

                            {/* Accent bar */}
                            <div className="absolute bottom-0 left-0 h-1 w-full bg-red-600/90 dark:bg-red-400/80" />
                        </div>

                        {/* Title + excerpt */}
                        <div className="space-y-4 p-6 sm:p-8">
                            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{singleNews.titulo}</h1>

                            {singleNews.descripcion && (
                                <p className="max-w-3xl border-l-4 border-red-600/80 pl-4 text-base leading-relaxed text-muted-foreground dark:border-red-400/70">
                                    {singleNews.descripcion}
                                </p>
                            )}
                        </div>
                    </header>

                    {/* Content */}
                    {singleNews.contenido ? (
                        <div className="border-t border-border/70 p-6 sm:p-8">
                            <div className="prose dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-red-600 dark:prose-a:text-red-400 prose-a:font-semibold max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: singleNews.contenido }} />
                            </div>
                        </div>
                    ) : null}
                </article>
            </div>
        </AppLayout>
    );
}

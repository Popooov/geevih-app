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

            <div className="mx-auto max-w-7xl px-6 pt-6 pb-16 lg:px-8 lg:pt-10 lg:pb-20">
                <div className="space-y-10 lg:space-y-12">
                    <div>
                        <Link
                            href="/noticias"
                            prefetch
                            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver a noticias
                        </Link>
                    </div>

                    <article className="overflow-hidden rounded-[2rem] bg-background shadow-[0_16px_40px_rgba(175,16,26,0.05)] ring-1 ring-black/5 dark:bg-zinc-950/95 dark:ring-white/10">
                        <header className="relative">
                            <div className="relative overflow-hidden">
                                <img
                                    src={imageSrc}
                                    alt={`Imagen de ${singleNews.titulo}`}
                                    className="h-[280px] w-full object-cover sm:h-[340px] lg:h-[420px]"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = '/images/noticia-placeholder.jpg';
                                    }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-black/0 to-transparent" />

                                <div className="absolute top-4 left-4">
                                    <div className="inline-flex items-center gap-2 rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md dark:bg-slate-900/90 dark:text-slate-200">
                                        <Calendar className="h-4 w-4 text-red-600 dark:text-red-400" />
                                        {singleNews.fecha}
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 h-1 w-full bg-red-600/90 dark:bg-red-400/80" />
                            </div>

                            <div className="space-y-6 px-6 py-8 sm:px-8 sm:py-10">
                                <div className="max-w-4xl space-y-4">
                                    <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl dark:text-white">
                                        {singleNews.titulo}
                                    </h1>

                                    {singleNews.descripcion && (
                                        <p className="max-w-3xl border-l-4 border-red-600/80 pl-4 text-base leading-8 text-muted-foreground dark:border-red-400/70 dark:text-zinc-300">
                                            {singleNews.descripcion}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                                        {singleNews.fecha}
                                    </div>

                                    {singleNews.source_url && (
                                        <a
                                            href={singleNews.source_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-sm font-semibold text-foreground ring-1 ring-border/70 backdrop-blur-sm transition-colors hover:bg-muted dark:bg-zinc-900/80 dark:text-white dark:ring-white/10 dark:hover:bg-zinc-800"
                                        >
                                            Ver fuente original
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </header>

                        {singleNews.contenido ? (
                            <div className="border-t border-border/60 px-6 py-8 sm:px-8 sm:py-10 dark:border-white/10">
                                <div className="prose prose-slate dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-red-600 dark:prose-a:text-red-400 prose-a:font-semibold max-w-none">
                                    <div dangerouslySetInnerHTML={{ __html: singleNews.contenido }} />
                                </div>
                            </div>
                        ) : (
                            <div className="border-t border-border/60 px-6 py-8 sm:px-8 sm:py-10 dark:border-white/10">
                                <p className="text-muted-foreground dark:text-zinc-300">No hay contenido adicional.</p>
                            </div>
                        )}
                    </article>
                </div>
            </div>
        </AppLayout>
    );
}

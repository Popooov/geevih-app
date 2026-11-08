import { siteButtonVariants } from '@/components/site-button';
import AppLayout from '@/layouts/app-layout';
import { type ShowNewsPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';

export default function Show() {
    const { singleNews } = usePage<ShowNewsPageProps>().props;

    const imageSrc = singleNews.imagen?.trim() ? singleNews.imagen : '/images/news-placeholder.png';

    return (
        <AppLayout>
            <Head title={singleNews.titulo} />

            <div className="site-page">
                <div className="lg:pt-8 site-stack">
                    <div>
                        <Link
                            href="/noticias"
                            prefetch
                            className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver a noticias
                        </Link>
                    </div>

                    <article className="overflow-hidden rounded-[2rem] bg-background shadow-[0_16px_40px_rgba(175,16,26,0.05)] ring-1 ring-black/5 dark:bg-zinc-950/95 dark:ring-white/10">
                        <header className="space-y-5 px-5 py-6 sm:px-8 sm:py-8">
                            <p className="flex items-center gap-2 text-sm text-muted-foreground dark:text-zinc-300">
                                <Calendar aria-hidden="true" className="h-4 w-4 shrink-0" />
                                {singleNews.fecha}
                            </p>

                            <div className="max-w-4xl space-y-4">
                                <h1 className="text-2xl leading-tight font-semibold tracking-tight break-words text-foreground sm:text-3xl lg:text-4xl dark:text-white">
                                    {singleNews.titulo}
                                </h1>

                                {singleNews.descripcion && (
                                    <p className="max-w-3xl text-base leading-7 text-foreground/75 dark:text-zinc-300">{singleNews.descripcion}</p>
                                )}
                            </div>

                            {singleNews.source_url && (
                                <a
                                    href={singleNews.source_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={siteButtonVariants({ variant: 'primary' }) + ' w-full sm:w-auto'}
                                >
                                    Ver fuente original
                                    <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
                                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                                </a>
                            )}
                        </header>

                        <figure className="mx-auto max-w-4xl px-5 pb-6 sm:px-8 sm:pb-8">
                            <img
                                src={imageSrc}
                                alt={`Imagen de ${singleNews.titulo}`}
                                decoding="async"
                                className="mx-auto max-h-[32rem] w-full rounded-xl bg-muted object-contain dark:bg-zinc-900"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = '/images/news-placeholder.png';
                                }}
                            />
                        </figure>

                        {singleNews.contenido?.trim() && (
                            <div className="border-t border-border/60 px-6 py-8 sm:px-8 sm:py-10 dark:border-white/10">
                                <div
                                    className="max-w-none text-[1.0625rem] leading-8 break-words text-muted-foreground dark:text-zinc-300 [&_a]:font-semibold [&_a]:text-red-600 [&_a]:underline [&_a]:underline-offset-4 dark:[&_a]:text-red-400 [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-5 [&_blockquote]:italic [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground dark:[&_h2]:text-white [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground dark:[&_h3]:text-white [&_li]:pl-1 [&_li]:leading-8 [&_li>p]:my-0 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-7 [&_p]:my-5 [&_p]:leading-8 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-foreground dark:[&_strong]:text-white [&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-7"
                                    dangerouslySetInnerHTML={{
                                        __html: singleNews.contenido,
                                    }}
                                />
                            </div>
                        )}
                    </article>
                </div>
            </div>
        </AppLayout>
    );
}

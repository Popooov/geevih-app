import NewsCard from '@/components/news-card';
import { siteButtonVariants } from '@/components/site-button';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type NewsPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

const fallbackImageSrc = '/images/news-placeholder.png';

export default function Index() {
    const { news } = usePage<NewsPageProps>().props;

    const featured = news.find((item) => Boolean(item.is_featured)) ?? null;
    const featuredImageSrc = featured?.imagen?.trim();
    const featuredSummary = featured?.descripcion?.trim();

    // Use only one item as the main featured news.
    // If more than one item is marked as featured in Filament,
    // the rest will still appear in the recent news list.
    const recentNews = featured ? news.filter((item) => item.id !== featured.id) : news;

    return (
        <AppLayout>
            <Head title="Noticias" />

            <div className="site-page">
                <div className="site-stack">
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/85 px-5 pt-10 pb-4 text-center backdrop-blur-xl sm:px-6 sm:pt-12 sm:pb-6 lg:pt-24 lg:pb-8 dark:bg-background/70">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.12),transparent_60%)]" />

                        <div className="relative mx-auto max-w-3xl">
                            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Noticias</h1>
                            <p className="mt-3 text-sm leading-6 text-balance text-muted-foreground sm:text-base">
                                Novedades científicas y actividad del Grupo GEEVIH.
                            </p>
                        </div>
                    </section>

                    {featured && (
                        <section
                            aria-labelledby="featured-news-title"
                            className="relative overflow-hidden rounded-[2rem] bg-background/92 px-5 pt-10 py-6 shadow-[0_24px_80px_rgba(175,16,26,0.05)] sm:px-8 sm:py-8 lg:px-10 dark:bg-zinc-950/85"
                        >
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(175,16,26,0.07),transparent_45%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(175,16,26,0.12),transparent_45%)]" />

                            <div
                                className={cn(
                                    'relative',
                                    featuredImageSrc && 'grid items-center gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-8',
                                )}
                            >
                                <div className="max-w-3xl min-w-0 space-y-4 sm:space-y-5">
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                                            Destacada
                                        </span>

                                        {featured.fecha && <span className="text-sm leading-5 text-muted-foreground">{featured.fecha}</span>}
                                    </div>

                                    <div className="space-y-3">
                                        <h2
                                            id="featured-news-title"
                                            className="text-3xl leading-[1.12] font-semibold tracking-tight text-balance [overflow-wrap:anywhere] text-foreground sm:text-4xl xl:text-[2.6rem]"
                                        >
                                            {featured.titulo}
                                        </h2>

                                        {featuredSummary && (
                                            <p className="max-w-2xl text-sm leading-6 [overflow-wrap:anywhere] text-muted-foreground sm:text-base sm:leading-7">
                                                {featuredSummary}
                                            </p>
                                        )}
                                    </div>

                                    <Link
                                        href={`/noticias/${featured.slug ?? featured.id}`}
                                        prefetch
                                        className={cn(siteButtonVariants({ variant: 'primary' }), 'w-full sm:w-auto')}
                                    >
                                        Leer noticia
                                        <ArrowRight aria-hidden="true" />
                                    </Link>
                                </div>

                                {featuredImageSrc && (
                                    <div className="mx-auto aspect-video w-full max-w-3xl overflow-hidden rounded-[1.5rem] bg-muted sm:rounded-[1.75rem]">
                                        <img
                                            src={featuredImageSrc}
                                            alt={featured.titulo}
                                            className="size-full object-contain"
                                            onError={({ currentTarget }) => {
                                                if (currentTarget.getAttribute('src') !== fallbackImageSrc) {
                                                    currentTarget.src = fallbackImageSrc;
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {recentNews.length > 0 ? (
                        <section aria-labelledby="recent-news-title" className={cn('space-y-5 sm:space-y-6', !featured && 'max-w-5xl')}>
                            <h2 id="recent-news-title" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                Últimas noticias
                            </h2>

                            <div className={cn('grid grid-cols-1 gap-6 md:grid-cols-2', featured && recentNews.length >= 3 && 'xl:grid-cols-3')}>
                                {recentNews.map((item) => (
                                    <NewsCard
                                        key={item.id}
                                        titulo={item.titulo}
                                        fecha={item.fecha}
                                        resumen={item.descripcion}
                                        imagen={item.imagen}
                                        enlace={`/noticias/${item.slug ?? item.id}`}
                                    />
                                ))}
                            </div>
                        </section>
                    ) : !featured ? (
                        <div className="rounded-[2rem] bg-background/80 px-6 py-10 text-center shadow-[0_14px_40px_rgba(175,16,26,0.03)] backdrop-blur sm:px-8 dark:bg-zinc-950/90">
                            <p className="mx-auto max-w-2xl text-sm leading-7 text-foreground/65 sm:text-base dark:text-zinc-300">
                                No hay noticias disponibles en este momento.
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        </AppLayout>
    );
}

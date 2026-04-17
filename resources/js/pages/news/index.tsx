import NewsCard from '@/components/news-card';
import AppLayout from '@/layouts/app-layout';
import { type NewsPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function Index() {
    const { news } = usePage<NewsPageProps>().props;

    const featured = news.find((item) => Boolean(item.is_featured)) ?? null;
    const rest = news.filter((item) => !item.is_featured);

    const gridColsClass = featured ? (rest.length >= 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-2') : 'xl:grid-cols-2';

    return (
        <AppLayout>
            <Head title="Noticias | GEEVIH" />

            <div className="mx-auto max-w-7xl px-6 pt-6 pb-16 lg:px-8 lg:pt-10 lg:pb-20">
                <div className={featured ? 'space-y-10 lg:space-y-12' : 'space-y-7 lg:space-y-8'}>
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/90 px-6 py-10 backdrop-blur-xl sm:px-8 lg:px-10 dark:bg-background/80">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.12),transparent_60%)]" />

                        <div className="relative max-w-3xl space-y-4">
                            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
                                Actualidad GEEVIH
                            </div>

                            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Noticias</h1>

                            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
                                Actualidad del Grupo GEEVIH, novedades científicas, participación institucional y contenidos de interés en el ámbito
                                del VIH.
                            </p>
                        </div>
                    </section>

                    {featured && (
                        <>
                            <section className="relative overflow-hidden rounded-[2rem] bg-background/92 px-6 py-6 shadow-[0_24px_80px_rgba(175,16,26,0.05)] backdrop-blur-xl sm:px-8 sm:py-8 lg:px-10 dark:bg-zinc-950/85">
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(175,16,26,0.07),transparent_45%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(175,16,26,0.12),transparent_45%)]" />

                                <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_420px] lg:items-start">
                                    <div className="flex h-full flex-col">
                                        <div className="space-y-7">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                                                    Destacada
                                                </span>

                                                <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-zinc-700 uppercase dark:bg-zinc-800 dark:text-zinc-300">
                                                    {featured.fecha}
                                                </span>
                                            </div>

                                            <div className="max-w-3xl space-y-4">
                                                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl dark:text-white">
                                                    {featured.titulo}
                                                </h2>

                                                {featured.descripcion && (
                                                    <p className="max-w-2xl text-sm leading-8 text-foreground/70 sm:text-lg dark:text-zinc-300">
                                                        {featured.descripcion}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-8">
                                            <div className="flex flex-wrap gap-3">
                                                <Link
                                                    href={`/noticias/${featured.slug ?? featured.id}`}
                                                    prefetch
                                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#af101a_0%,#d32f2f_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(175,16,26,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(175,16,26,0.22)]"
                                                >
                                                    Leer noticia
                                                    <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative overflow-hidden rounded-[1.75rem] bg-background shadow-[0_20px_50px_rgba(175,16,26,0.08)] dark:bg-zinc-950/95">
                                        <img
                                            src={featured.imagen?.trim() ? featured.imagen : '/images/noticia-placeholder.jpg'}
                                            alt={featured.titulo}
                                            className="h-[280px] w-full object-cover sm:h-[340px] lg:h-[420px]"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = '/images/noticia-placeholder.jpg';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-black/0 to-transparent" />
                                    </div>
                                </div>
                            </section>

                            <div className="h-px bg-border/40 dark:bg-white/10" />
                        </>
                    )}

                    {rest.length > 0 ? (
                        <section className={featured ? 'space-y-8' : 'max-w-5xl space-y-6'}>
                            <div className="max-w-2xl space-y-3">
                                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
                                    {featured ? 'Archivo' : 'Últimas publicaciones'}
                                </div>

                                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl dark:text-white">
                                    Noticias recientes
                                </h2>

                                <p className="text-sm leading-7 text-foreground/65 sm:text-base dark:text-zinc-300">
                                    {featured
                                        ? 'Consulta otras publicaciones y contenidos recientes del grupo.'
                                        : 'Consulta las publicaciones y novedades más recientes del grupo.'}
                                </p>
                            </div>

                            <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${gridColsClass}`}>
                                {rest.map((item) => (
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

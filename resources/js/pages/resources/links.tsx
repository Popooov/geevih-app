import LinkCard from '@/components/link-card';
import AppLayout from '@/layouts/app-layout';
import { type ResourcesPageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Links() {
    const { resources = [] } = usePage<ResourcesPageProps>().props;

    const pinned = resources.filter((r) => r.is_pinned);
    const others = resources.filter((r) => !r.is_pinned);

    return (
        <AppLayout>
            <Head title="Enlaces de Interés | GEEVIH" />

            <div className="mx-auto max-w-6xl px-6 pt-6 pb-12 lg:px-8 lg:pt-10 lg:pb-14">
                <div className="space-y-14">
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/85 px-6 py-12 text-center backdrop-blur-xl dark:bg-background/70">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.12),transparent_60%)]" />

                        <div className="relative mx-auto max-w-3xl">
                            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Recursos GEEVIH</p>

                            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
                                Enlaces de Interés
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                                Accede a portales oficiales, sociedades científicas y entidades de referencia nacional e internacional en el ámbito
                                del VIH.
                            </p>
                        </div>
                    </section>

                    {pinned.length > 0 ? (
                        <section className="space-y-6">
                            <div className="text-center">
                                <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">Selección destacada</p>
                                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Enlaces recomendados</h2>
                            </div>

                            <div className="space-y-6">
                                {pinned.map((r) => (
                                    <LinkCard
                                        key={r.id}
                                        href={r.enlace ?? '#'}
                                        titulo={r.titulo}
                                        descripcion={r.descripcion}
                                        imagen={r.imagen}
                                        is_pinned
                                    />
                                ))}
                            </div>
                        </section>
                    ) : null}

                    <section className="space-y-6">
                        {pinned.length > 0 ? (
                            <div className="text-center">
                                <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Todos los enlaces</p>
                                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Directorio completo</h2>
                            </div>
                        ) : null}

                        <div className="space-y-6">
                            {(pinned.length > 0 ? others : resources).map((r) => (
                                <LinkCard
                                    key={r.id}
                                    href={r.enlace ?? '#'}
                                    titulo={r.titulo}
                                    descripcion={r.descripcion}
                                    imagen={r.imagen}
                                    is_pinned={r.is_pinned}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

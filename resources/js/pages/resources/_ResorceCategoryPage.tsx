import PaginationBar from '@/components/category-pagination';
import ResourceCard from '@/components/resource-card';
import AppLayout from '@/layouts/app-layout';
import { type Resource } from '@/types';
import { Head } from '@inertiajs/react';
import ResourceGrid from './_ResourceGrid';

interface ResourceCategoryPageProps {
    title: string;
    eyebrow?: string;
    heading: string;
    description: string;
    basePath: string;
    resources: Resource[];
    current_page: number;
    last_page: number;
}

export default function ResourceCategoryPage({
    title,
    eyebrow = 'Recursos GEEVIH',
    heading,
    description,
    basePath,
    resources,
    current_page,
    last_page,
}: ResourceCategoryPageProps) {
    const pinned = resources.filter((r) => r.is_pinned);
    const others = resources.filter((r) => !r.is_pinned);

    return (
        <AppLayout>
            <Head title={title} />

            <div className="mx-auto max-w-6xl px-6 pt-6 pb-12 lg:px-8 lg:pt-10 lg:pb-14">
                <div className="space-y-14">
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/85 px-6 py-12 text-center backdrop-blur-xl dark:bg-background/70">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.12),transparent_60%)]" />

                        <div className="relative mx-auto max-w-3xl">
                            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">{eyebrow}</p>

                            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
                                {heading}
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">{description}</p>
                        </div>
                    </section>

                    {pinned.length > 0 ? (
                        <section className="space-y-6">
                            <div className="text-center">
                                <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">Selección destacada</p>
                                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Recursos recomendados</h2>
                            </div>

                            <ResourceGrid>
                                {pinned.map((r) => (
                                    <ResourceCard
                                        key={r.id}
                                        titulo={r.titulo}
                                        tipo={r.tipo}
                                        fecha={r.fecha}
                                        descripcion={r.descripcion}
                                        imagen={r.imagen}
                                        enlace={r.enlace ?? null}
                                        is_pinned={r.is_pinned}
                                    />
                                ))}
                            </ResourceGrid>
                        </section>
                    ) : null}

                    <section className="space-y-6">
                        {pinned.length > 0 ? (
                            <div className="text-center">
                                <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Todos los recursos</p>
                                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Biblioteca completa</h2>
                            </div>
                        ) : null}

                        <ResourceGrid>
                            {(pinned.length > 0 ? others : resources).map((r) => (
                                <ResourceCard
                                    key={r.id}
                                    titulo={r.titulo}
                                    tipo={r.tipo}
                                    fecha={r.fecha}
                                    descripcion={r.descripcion}
                                    imagen={r.imagen}
                                    enlace={r.enlace ?? null}
                                    is_pinned={r.is_pinned}
                                />
                            ))}
                        </ResourceGrid>

                        <PaginationBar basePath={basePath} current={current_page} last={last_page} />
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

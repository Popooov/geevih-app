import LinkCard from '@/components/link-card';
import AppLayout from '@/layouts/app-layout';
import { type ResourcesPageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Links() {
    const { resources = [] } = usePage<ResourcesPageProps>().props;

    // 🔥 Separar fijados
    const pinned = resources.filter((r) => r.is_pinned);
    const others = resources.filter((r) => !r.is_pinned);

    return (
        <AppLayout>
            <Head title="Enlaces de Interés | GEEVIH" />

            <div className="mx-auto max-w-6xl space-y-20 p-6 pt-16">
                {/* HERO */}
                <header className="space-y-4 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">Enlaces de Interés</h1>

                    <p className="mx-auto max-w-3xl text-gray-600 md:text-xl dark:text-gray-400">
                        Portales oficiales y organizaciones de referencia nacional e internacional en el ámbito del VIH.
                    </p>
                </header>

                {/* 🔥 DESTACADOS */}
                {pinned.length > 0 && (
                    <section className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">Enlaces destacados</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                )}

                {/* 🔥 TODOS */}
                {others.length > 0 && (
                    <section className="space-y-8">
                        {pinned.length > 0 && (
                            <div className="text-center">
                                <h2 className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">Todos los enlaces</h2>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {others.map((r) => (
                                <LinkCard key={r.id} href={r.enlace ?? '#'} titulo={r.titulo} descripcion={r.descripcion} imagen={r.imagen} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </AppLayout>
    );
}

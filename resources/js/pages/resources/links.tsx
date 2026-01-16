import LinkCard from '@/components/link-card';
import AppLayout from '@/layouts/app-layout';
import { type ResourcesPageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Links() {
    const { resources = [] } = usePage<ResourcesPageProps>().props;

    return (
        <AppLayout>
            <Head title="Enlaces de Interés | GEEVIH" />

            <div className="mx-auto max-w-6xl space-y-16 p-6 pt-16">
                <header className="space-y-3 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h1 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
                            Enlaces de Interés
                        </h1>
                        <p className="mx-auto max-w-3xl text-center text-gray-600 md:text-xl dark:text-gray-400">
                            Accede a portales oficiales y organizaciones de referencia nacional e internacional en el ámbito del VIH.
                        </p>
                    </div>
                </header>

                <section className="space-y-4">
                    {resources.map((r, index) => (
                        <LinkCard
                            key={index}
                            href={r.enlace}
                            titulo={r.titulo}
                            descripcion={r.descripcion}
                        />
                    ))}
                </section>
            </div>
        </AppLayout>
    );
}

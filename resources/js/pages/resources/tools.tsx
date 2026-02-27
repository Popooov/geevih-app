import PaginationBar from '@/components/category-pagination';
import ResourceCard from '@/components/resource-card';
import AppLayout from '@/layouts/app-layout';
import { type ResourcesPageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import ResourceGrid from './_ResourceGrid';

export default function Herramientas() {
    const { resources = [], pagination = { current_page: 1, last_page: 1 } } = usePage<ResourcesPageProps>().props;

    const { current_page, last_page } = pagination;

    return (
        <AppLayout>
            <Head title="Herramientas Prácticas | GEEVIH" />
            <div className="mx-auto max-w-6xl space-y-16 p-6 pt-16">
                <header className="space-y-3 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h1 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
                            Herramientas Prácticas
                        </h1>
                        <p className="mx-auto max-w-3xl text-center text-gray-600 md:text-xl dark:text-gray-400">
                            Calculadoras, checklists y plantillas para la práctica clínica diaria.
                        </p>
                    </div>
                </header>

                <ResourceGrid>
                    {resources.map((r) => (
                        <ResourceCard key={r.id} titulo={r.titulo} tipo={r.tipo} fecha={r.fecha} imagen={r.imagen} enlace={r.enlace ?? null} />
                    ))}
                </ResourceGrid>

                <PaginationBar basePath="/recursos/herramientas" current={current_page} last={last_page} />
            </div>
        </AppLayout>
    );
}

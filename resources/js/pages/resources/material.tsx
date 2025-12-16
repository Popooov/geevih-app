import PaginationBar from '@/components/category-pagination';
import ResourceCard from '@/components/resource-card';
import AppLayout from '@/layouts/app-layout';
import { type ResourcesPageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import ResourceGrid from './_ResourceGrid';

export default function Material() {
    const { props } = usePage<ResourcesPageProps>();
    const items = props.resources ?? [];
    const { current_page, last_page } = props.pagination ?? { current_page: 1, last_page: 1 };

    return (
        <AppLayout>
            <Head title="Material de Apoyo al Paciente" />
            <div className="mx-auto max-w-6xl space-y-16 p-6 pt-16">
                <header className="mb-6">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h1 className="text-center text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">Material de Apoyo al Paciente</h1>
                        <p className="mx-auto max-w-3xl text-center md:text-xl text-gray-600 dark:text-gray-400">Recursos educativos descargables e imprimibles.</p>
                    </div>
                </header>

                <ResourceGrid>
                    {items.map((r) => (
                        <ResourceCard key={r.id} titulo={r.titulo} tipo={r.tipo} fecha={r.fecha} enlace={r.enlace} />
                    ))}
                </ResourceGrid>

                <PaginationBar basePath="/recursos/material" current={current_page} last={last_page} />
            </div>
        </AppLayout>
    );
}

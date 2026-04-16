import PaginationBar from '@/components/category-pagination';
import ResourceCard from '@/components/resource-card';
import AppLayout from '@/layouts/app-layout';
import { type Resource } from '@/types';
import { Head } from '@inertiajs/react';
import ResourceGrid from './_ResourceGrid';

interface ResourceCategoryPageProps {
    title: string;
    heading: string;
    description: string;
    basePath: string;
    resources: Resource[];
    current_page: number;
    last_page: number;
}

export default function ResourceCategoryPage({
    title,
    heading,
    description,
    basePath,
    resources,
    current_page,
    last_page,
}: ResourceCategoryPageProps) {
    return (
        <AppLayout>
            <Head title={title} />

            <div className="mx-auto max-w-6xl space-y-16 p-6 pt-16">
                <header className="space-y-3 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h1 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">{heading}</h1>

                        <p className="mx-auto max-w-3xl text-center text-gray-600 md:text-xl dark:text-gray-400">{description}</p>
                    </div>
                </header>

                <ResourceGrid>
                    {resources.map((r) => (
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
            </div>
        </AppLayout>
    );
}

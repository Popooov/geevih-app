import CategoryPagination from '@/components/category-pagination';
import ResourceCard from '@/components/resource-card';
import AppLayout from '@/layouts/app-layout';
import { type ResourcesPageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import ResourceGrid from './_ResourceGrid';

export default function Guides() {
    const { resources = [], pagination = { current_page: 1, last_page: 1 } } = usePage<ResourcesPageProps>().props;

    const { current_page, last_page } = pagination;

    return (
        <AppLayout>
            <Head title="Guías y Protocolos" />
            <div className="mx-auto max-w-6xl space-y-16 p-6 pt-16">
                <header className="space-y-3 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">Guías y Protocolos</h1>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">
                            Compendio de guías clínicas y protocolos validados por GEEVIH.
                        </p>
                    </div>

                    {/* Simple Search Mockup (for better design) */}
                    {/* <div className="mt-8 flex justify-center">
                        <div className="relative w-full max-w-md">
                            <input
                                type="text"
                                placeholder="Buscar por título, tipo o fecha..."
                                className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-base transition focus:border-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        </div>
                    </div> */}
                </header>

                <ResourceGrid>
                    {resources.map((r) => (
                        <ResourceCard key={r.id} titulo={r.titulo} tipo={r.tipo} fecha={r.fecha} imagen={r.imagen} enlace={r.enlace ?? null} />
                    ))}
                </ResourceGrid>

                <CategoryPagination basePath="/recursos/guias" current={current_page} last={last_page} />
            </div>
        </AppLayout>
    );
}

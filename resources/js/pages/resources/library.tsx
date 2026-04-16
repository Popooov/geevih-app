import { type ResourcesPageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import ResourceCategoryPage from './_ResorceCategoryPage';

export default function Biblioteca() {
    const { resources = [], pagination = { current_page: 1, last_page: 1 } } = usePage<ResourcesPageProps>().props;

    return (
        <ResourceCategoryPage
            title="Biblioteca de Artículos Científicos | GEEVIH"
            heading="Biblioteca de Artículos Científicos"
            description="Selección curada de publicaciones del área."
            basePath="/recursos/biblioteca"
            resources={resources}
            current_page={pagination.current_page}
            last_page={pagination.last_page}
        />
    );
}

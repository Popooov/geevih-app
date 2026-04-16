import { type ResourcesPageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import ResourceCategoryPage from './_ResorceCategoryPage';

export default function Material() {
    const { resources = [], pagination = { current_page: 1, last_page: 1 } } = usePage<ResourcesPageProps>().props;

    return (
        <ResourceCategoryPage
            title="Material de Apoyo al Paciente | GEEVIH"
            heading="Material de Apoyo al Paciente"
            description="Recursos educativos descargables e imprimibles."
            basePath="/recursos/material"
            resources={resources}
            current_page={pagination.current_page}
            last_page={pagination.last_page}
        />
    );
}

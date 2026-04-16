import { type ResourcesPageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import ResourceCategoryPage from './_ResorceCategoryPage';

export default function Herramientas() {
    const { resources = [], pagination = { current_page: 1, last_page: 1 } } = usePage<ResourcesPageProps>().props;

    return (
        <ResourceCategoryPage
            title="Herramientas Prácticas | GEEVIH"
            heading="Herramientas Prácticas"
            description="Calculadoras, checklists y plantillas para la práctica clínica diaria."
            basePath="/recursos/herramientas"
            resources={resources}
            current_page={pagination.current_page}
            last_page={pagination.last_page}
        />
    );
}

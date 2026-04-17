import { type ResourcesPageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import ResourceCategoryPage from './_ResorceCategoryPage';

export default function Herramientas() {
    const { resources = [], pagination = { current_page: 1, last_page: 1 } } = usePage<ResourcesPageProps>().props;

    return (
        <ResourceCategoryPage
            title="Herramientas Prácticas | GEEVIH"
            eyebrow="Recursos GEEVIH"
            heading="Herramientas Prácticas"
            description="Calculadoras, checklists, plantillas y otros materiales útiles para la práctica clínica diaria en el ámbito del VIH."
            basePath="/recursos/herramientas"
            resources={resources}
            current_page={pagination.current_page}
            last_page={pagination.last_page}
        />
    );
}

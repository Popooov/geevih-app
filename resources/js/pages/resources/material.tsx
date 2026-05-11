import { type ResourcesPageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import ResourceCategoryPage from './_ResorceCategoryPage';

export default function Material() {
    const { resources = [], pagination = { current_page: 1, last_page: 1 } } = usePage<ResourcesPageProps>().props;

    return (
        <ResourceCategoryPage
            title="Material de apoyo para las PVIH | GEEVIH"
            eyebrow="Recursos GEEVIH"
            heading="Material de apoyo para las personas con VIH"
            description="Recursos educativos descargables e imprimibles para apoyar la atención, la educación sanitaria y el acompañamiento a pacientes."
            basePath="/recursos/material"
            resources={resources}
            current_page={pagination.current_page}
            last_page={pagination.last_page}
        />
    );
}

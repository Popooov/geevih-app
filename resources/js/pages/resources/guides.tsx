import { type ResourcesPageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import ResourceCategoryPage from './_ResorceCategoryPage';

export default function Guides() {
    const { resources = [], pagination = { current_page: 1, last_page: 1 } } = usePage<ResourcesPageProps>().props;

    return (
        <ResourceCategoryPage
            title="Guías y Protocolos | GEEVIH"
            eyebrow="Recursos GEEVIH"
            heading="Guías y Protocolos"
            description="Compendio de guías clínicas, protocolos y documentos validados para apoyar la práctica enfermera experta en VIH."
            basePath="/recursos/guias"
            resources={resources}
            current_page={pagination.current_page}
            last_page={pagination.last_page}
        />
    );
}

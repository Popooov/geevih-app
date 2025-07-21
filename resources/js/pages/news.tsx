import NewsCard from '@/components/news-card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Newspaper } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Noticias',
        href: '/noticias',
    },
];

export default function Noticias() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Noticias" />
            <div className="mx-auto max-w-6xl space-y-10 p-6">
                <h1 className="flex items-center gap-2 mt-6 lg:mt-8 text-center text-3xl font-bold">
                    <Newspaper className="h-7 w-7 text-primary" />
                    Noticias
                </h1>
                <p className="text-muted-foreground">Actualidad y novedades del Grupo GEEVIH: actividades, logros, y participación institucional.</p>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <NewsCard
                        titulo="Participación del GEEVIH en el Congreso Nacional de Enfermería"
                        fecha="12 de marzo de 2025"
                        resumen="El grupo presentó tres comunicaciones sobre cuidados integrales en VIH durante el evento celebrado en Madrid."
                        enlace="/noticias/congreso-2025"
                    />
                    <NewsCard
                        titulo="Publicación en revista científica sobre estigma"
                        fecha="20 de febrero de 2025"
                        resumen="Nuevo artículo sobre intervención enfermera para la reducción del estigma asociado al VIH."
                        enlace="/noticias/publicacion-estigma"
                    />
                </div>
            </div>
        </AppLayout>
    );
}

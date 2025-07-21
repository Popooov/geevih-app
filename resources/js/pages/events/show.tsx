import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type ShowEventPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function Show() {
    const { event } = usePage<ShowEventPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Eventos', href: '/eventos' },
        { title: event.titulo, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={event.titulo} />

            <div className="mx-auto max-w-3xl space-y-6 p-6">
                <Link href="/eventos" prefetch className="flex items-center text-sm text-primary underline">
                    <ArrowLeft className="mr-1 h-4 w-4" /> Volver
                </Link>

                <div className="overflow-hidden rounded-2xl shadow-lg">
                    <img src={event.imagen} alt={`Imagen de ${event.titulo}`} className="h-64 w-full object-cover" />
                </div>

                <h1 className="text-3xl font-bold">{event.titulo}</h1>
                <p className="text-sm text-gray-500">{event.fecha}</p>
                <p className="mt-4 text-gray-700">{event.descripcion}</p>

                {event.contenido && (
                    <div className="prose mt-6">
                        <div dangerouslySetInnerHTML={{ __html: event.contenido }} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

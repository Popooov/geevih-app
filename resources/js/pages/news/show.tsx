import AppLayout from '@/layouts/app-layout';
import { type ShowNewsPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function Show() {
    const { singleNews } = usePage<ShowNewsPageProps>().props;

    return (
        <AppLayout>
            <Head title={singleNews.titulo} />

            <div className="mx-auto mb-12 max-w-3xl space-y-6 p-6">
                <Link href="/noticias" prefetch className="flex items-center text-sm text-primary underline">
                    <ArrowLeft className="mr-1 h-4 w-4" /> Volver
                </Link>

                <div className="overflow-hidden rounded-2xl shadow-lg">
                    <img src={singleNews.imagen} alt={`Imagen de ${singleNews.titulo}`} className="h-64 w-full object-cover" />
                </div>

                <h1 className="text-3xl font-bold">{singleNews.titulo}</h1>
                <p className="text-sm text-gray-500">{singleNews.fecha}</p>
                <p className="mt-4 text-gray-700">{singleNews.descripcion}</p>

                {singleNews.contenido && (
                    <div className="prose mt-6">
                        <div dangerouslySetInnerHTML={{ __html: singleNews.contenido }} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

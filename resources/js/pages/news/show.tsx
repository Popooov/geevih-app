import AppLayout from '@/layouts/app-layout';
import { type ShowNewsPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function Show() {
    const { singleNews } = usePage<ShowNewsPageProps>().props;

    const imageSrc = singleNews.imagen?.trim() ? singleNews.imagen : '/images/noticia-placeholder.jpg';

    return (
        <AppLayout>
            <Head title={singleNews.titulo} />

            <div className="mx-auto mb-12 max-w-3xl space-y-6 p-6">
                <Link href="/noticias" prefetch className="flex items-center text-sm text-primary underline">
                    <ArrowLeft className="mr-1 h-4 w-4" /> Volver
                </Link>

                <div className="overflow-hidden rounded-2xl shadow-lg">
                    <img
                        src={imageSrc}
                        alt={`Imagen de ${singleNews.titulo}`}
                        className="h-64 w-full object-cover"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/noticia-placeholder.jpg';
                        }}
                    />
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">{singleNews.titulo}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{singleNews.fecha}</p>

                    {singleNews.source_url && (
                        <a
                            href={singleNews.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                        >
                            Fuente
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                </div>

                <p className="mt-4 text-gray-700 dark:text-gray-200">{singleNews.descripcion}</p>

                {singleNews.contenido && (
                    <div className="prose dark:prose-invert mt-6 max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: singleNews.contenido }} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

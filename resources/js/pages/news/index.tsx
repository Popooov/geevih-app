import NewsCard from '@/components/news-card';
import AppLayout from '@/layouts/app-layout';
import { type NewsPageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Index() {
    const { news } = usePage<NewsPageProps>().props;

    return (
        <AppLayout>
            <Head title="Noticias" />
            <div className="mx-auto max-w-6xl space-y-16 p-6 pt-16">
                <header className="space-y-3 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h1 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">Noticias</h1>
                        <p className="mx-auto max-w-3xl text-center text-gray-600 md:text-xl dark:text-gray-400">
                            Actualidad y novedades del Grupo GEEVIH: actividades, logros, y participación institucional.
                        </p>
                    </div>
                </header>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {news.length > 0 ? (
                        news.map((item) => (
                            <NewsCard
                                key={item.id}
                                titulo={item.titulo}
                                fecha={item.fecha}
                                resumen={item.descripcion}
                                imagen={item.imagen}
                                enlace={`/noticias/${item.id}`}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">No hay noticias disponibles.</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

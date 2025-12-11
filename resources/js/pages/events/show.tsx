import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type ShowEventPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';

const getFormattedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export default function Show() {
    const { event } = usePage<ShowEventPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Eventos', href: '/eventos' },
        { title: event.titulo, href: '' },
    ];

    const dateFormatted = getFormattedDate(event.fecha);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={event.titulo} />

            <div className="mx-auto mt-2 max-w-5xl space-y-8 p-6 md:mt-7 lg:p-0">
                {/* Back Link */}
                <Link
                    href="/eventos"
                    className="inline-flex items-center text-base font-semibold text-gray-600 transition hover:text-amber-600 dark:text-gray-400"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Volver a Eventos
                </Link>

                {/* Event Container Card */}
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                    {/* Event Image */}
                    <div className="relative">
                        <img
                            src={event.imagen}
                            alt={`Imagen de ${event.titulo}`}
                            className={`h-64 w-full object-cover sm:h-80`}
                        />
                    </div>

                    {/* Content Area */}
                    <div className="space-y-6 p-6 md:p-10">
                        <div className="space-y-2">
                            {/* Title */}
                            <h1 className="text-4xl leading-tight font-extrabold text-gray-900 dark:text-white">{event.titulo}</h1>
                            {/* Description */}
                            <p className="border-l-4 border-amber-500 py-1 pl-4 text-lg text-gray-600 italic dark:text-gray-300">
                                {event.descripcion}
                            </p>
                        </div>

                        {/* Metadata Grid (Date, Time, Location) */}
                        <div className="grid grid-cols-2 gap-4 md:justify-items-center items-start border-t pt-4 md:grid-cols-3">
                            {/* Date */}
                            <div className="flex items-center gap-3 md:text-lg font-semibold dark:text-white">
                                <Calendar className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Fecha</p>
                                    <p>{dateFormatted}</p>
                                </div>
                            </div>

                            {/* Time (Conditional) */}
                            {event.hora && (
                                <div className="flex items-center gap-3 md:text-lg font-semibold dark:text-white">
                                    <Clock className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Hora</p>
                                        <p>{event.hora}</p>
                                    </div>
                                </div>
                            )}

                            {/* Location (Uses two columns on small screens if Time is missing) */}
                            <div
                                className={`flex items-center gap-3 md:text-lg font-semibold dark:text-white ${!event.hora ? 'col-span-2 md:col-span-1' : 'md:col-span-1'}`}
                            >
                                <MapPin className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Lugar</p>
                                    <p>{event.lugar}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event Content Section */}
                {event.contenido && (
                    <section className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-lg md:p-10 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="mb-6 border-b pb-2 text-3xl font-bold text-gray-900 dark:text-white">Detalles del Evento</h2>
                        {/* Tailwind Typography setup for rendering HTML content */}
                        <div className="prose dark:prose-invert prose-amber max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: event.contenido }} />
                        </div>
                    </section>
                )}
            </div>
        </AppLayout>
    );
}

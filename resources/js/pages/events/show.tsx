import AppLayout from '@/layouts/app-layout';
import { type ShowEventPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, ExternalLink, Globe, MapPin, Ticket } from 'lucide-react';

export default function Show() {
    const { event } = usePage<ShowEventPageProps>().props;

    const imageSrc = event.imagen?.trim() ? event.imagen : '/images/evento-placeholder.jpg';

    return (
        <AppLayout>
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
                            src={imageSrc}
                            alt={`Imagen de ${event.titulo}`}
                            className="h-64 w-full object-cover sm:h-80"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = '/images/evento-placeholder.jpg';
                            }}
                        />

                        {/* Online badge */}
                        {event.is_online && (
                            <div className="absolute top-4 left-4 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-bold tracking-wide text-white backdrop-blur">
                                Online
                            </div>
                        )}
                    </div>

                    {/* Content Area */}
                    <div className="space-y-6 p-6 md:p-10">
                        <div className="space-y-2">
                            <h1 className="text-4xl leading-tight font-extrabold text-gray-900 dark:text-white">{event.titulo}</h1>

                            {event.descripcion && (
                                <p className="border-l-4 border-amber-500 py-1 pl-4 text-lg text-gray-600 italic dark:text-gray-300">
                                    {event.descripcion}
                                </p>
                            )}
                        </div>

                        {/* CTA buttons */}
                        {(event.registration_url || event.online_url) && (
                            <div className="flex flex-col gap-3 sm:flex-row">
                                {event.registration_url && (
                                    <a
                                        href={event.registration_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-amber-700"
                                    >
                                        <Ticket className="h-4 w-4" />
                                        Inscribirse
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                )}

                                {event.online_url && (
                                    <a
                                        href={event.online_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-600 px-4 py-2 text-sm font-bold text-amber-700 transition hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-900/20"
                                    >
                                        <Globe className="h-4 w-4" />
                                        Acceder online
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 items-start gap-4 border-t pt-4 md:grid-cols-3 md:justify-items-center">
                            {/* Fecha */}
                            <div className="flex items-center gap-3 font-semibold md:text-lg dark:text-white">
                                <Calendar className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Fecha</p>
                                    {/* IMPORTANTE: ya viene formateada desde backend */}
                                    <p>{event.fecha}</p>
                                </div>
                            </div>

                            {/* Hora */}
                            {event.hora && (
                                <div className="flex items-center gap-3 font-semibold md:text-lg dark:text-white">
                                    <Clock className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Hora</p>
                                        <p>{event.hora}</p>
                                    </div>
                                </div>
                            )}

                            {/* Lugar */}
                            <div
                                className={`flex items-center gap-3 font-semibold md:text-lg dark:text-white ${!event.hora ? 'col-span-2 md:col-span-1' : ''}`}
                            >
                                <MapPin className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Lugar</p>
                                    <p>{event.is_online ? 'Online' : event.lugar}</p>
                                </div>
                            </div>

                            {/* Fin (opcional, si lo mandas como "fin" desde backend) */}
                            {event.fin && (
                                <div className="col-span-2 flex items-center gap-3 font-semibold md:col-span-3 md:justify-center md:text-lg dark:text-white">
                                    <Calendar className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Fin</p>
                                        <p>{event.fin}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Event Content Section */}
                {event.contenido && (
                    <section className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-lg md:p-10 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="mb-6 border-b pb-2 text-3xl font-bold text-gray-900 dark:text-white">Detalles del Evento</h2>
                        <div className="prose prose-amber dark:prose-invert max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: event.contenido }} />
                        </div>
                    </section>
                )}
            </div>
        </AppLayout>
    );
}

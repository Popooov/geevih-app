import EventCard from '@/components/event-card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Archive, CalendarCheck, Trophy } from 'lucide-react';


export default function Index() {
    const { upcomingEvents, pastEvents } = usePage<PageProps>().props;

    return (
        <AppLayout>
            <Head title="Eventos" />
            <div className="mx-auto max-w-6xl space-y-10 p-6">
                <h1 className="mt-6 text-center text-3xl font-bold lg:mt-8">Eventos y Actividades</h1>

                {/* Próximos eventos */}
                <section className="space-y-4">
                    <h2 className="flex items-center gap-2 text-2xl font-semibold">
                        <CalendarCheck className="h-6 w-6" />
                        Próximos eventos
                    </h2>
                    {/* Aquí se pueden mostrar tarjetas o una lista dinámica en el futuro */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {upcomingEvents.length > 0 ? (
                            upcomingEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    titulo={event.titulo}
                                    fecha={event.fecha}
                                    descripcion={event.descripcion}
                                    imagen={event.imagen}
                                    link={event.link}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No hay próximos eventos.</p>
                        )}
                    </div>
                </section>

                {/* Eventos pasados */}
                <section className="space-y-4">
                    <h2 className="flex items-center gap-2 text-2xl font-semibold">
                        <Archive className="h-6 w-6" />
                        Eventos pasados
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {pastEvents.length > 0 ? (
                            pastEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    titulo={event.titulo}
                                    fecha={event.fecha}
                                    descripcion={event.descripcion}
                                    imagen={event.imagen}
                                    link={event.link}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No hay eventos pasados.</p>
                        )}
                    </div>
                </section>

                {/* Convocatorias abiertas */}
                <section className="space-y-4">
                    <h2 className="flex items-center gap-2 text-2xl font-semibold">
                        <Trophy className="h-6 w-6" />
                        Convocatorias abiertas
                    </h2>
                </section>
            </div>
        </AppLayout>
    );
}

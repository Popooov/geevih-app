import EventCard from '@/components/event-card';
import AppLayout from '@/layouts/app-layout';
import { type EventPageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Archive, CalendarCheck } from 'lucide-react';

export default function Index() {
    const { upcomingEvents, pastEvents } = usePage<EventPageProps>().props;

    const SectionHeader = ({ icon: Icon, title, color }) => (
        // font-bold for section titles
        <h2 className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-800 dark:border-gray-700 dark:text-gray-100">
            <Icon className={`h-7 w-7 ${color}`} />
            {title}
        </h2>
    );

    return (
        <AppLayout>
            <Head title="Eventos" />
            <div className="pt-10">
                <div className="mx-auto max-w-6xl space-y-16 p-6">
                    {/* Global Header */}
                    <header className="space-y-3 text-center">
                        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">Eventos y Actividades</h1>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">
                            Consulta la agenda de congresos, seminarios, talleres y oportunidades de colaboración del Grupo GEEVIH.
                        </p>
                    </header>

                    {/* 1. Próximos eventos */}
                    <section className="space-y-6">
                        <SectionHeader icon={CalendarCheck} title="Próximos Eventos" color="text-amber-600 dark:text-amber-500" />
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event) => (
                                    <EventCard
                                        key={event.id}
                                        titulo={event.titulo}
                                        fecha={event.fecha}
                                        hora={event.hora}
                                        descripcion={event.descripcion}
                                        imagen={event.imagen}
                                        enlace={event.link}
                                        lugar={event.lugar}
                                    />
                                ))
                            ) : (
                                <p className="col-span-full py-6 text-center text-lg text-gray-500 dark:text-gray-400">
                                    No hay próximos eventos programados.
                                </p>
                            )}
                        </div>
                    </section>

                    {/* 2. Eventos pasados */}
                    <section className="space-y-6">
                        <SectionHeader icon={Archive} title="Eventos Pasados" color="text-indigo-600 dark:text-indigo-400" />
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {pastEvents.length > 0 ? (
                                pastEvents.map((event) => (
                                    <EventCard
                                        key={event.id}
                                        titulo={event.titulo}
                                        fecha={event.fecha}
                                        hora={event.hora}
                                        descripcion={event.descripcion}
                                        imagen={event.imagen}
                                        enlace={event.link}
                                        lugar={event.lugar}
                                        isPast={true} // Mark as past event for styling
                                    />
                                ))
                            ) : (
                                <p className="col-span-full py-6 text-center text-lg text-gray-500 dark:text-gray-400">
                                    No hay eventos pasados registrados.
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

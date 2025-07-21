import EventCard from '@/components/ui/event-card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Archive, CalendarCheck, Trophy } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Eventos',
        href: '/eventos',
    },
];

export default function Events() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Eventos" />
            <div className="mx-auto max-w-6xl space-y-10 p-6">
                <h1 className="mt-6 lg:mt-8 text-center text-3xl font-bold">Eventos y Actividades</h1>

                {/* Próximos eventos */}
                <section className="space-y-4">
                    <h2 className="flex items-center gap-2 text-2xl font-semibold">
                        <CalendarCheck className="h-6 w-6" />
                        Próximos eventos
                    </h2>
                    {/* Aquí se pueden mostrar tarjetas o una lista dinámica en el futuro */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <EventCard
                            titulo="European HIV Nurse Network (EHNN) Webinar"
                            fecha="1 de abril de 2025"
                            descripcion="Join us for an insightful session where experts in HIV nursing will share the latest updates, best practices, and innovative approaches to patient care."
                            imagen="/images/events/european-hiv-nursing.png"
                            link="#"
                        />
                        <EventCard
                            titulo="Reunión SEISIDA 2025"
                            fecha="29 de abril de 2025"
                            descripcion="Cuidados diversos para necesidades diversas."
                            imagen="/images/events/SAVE-THE-DATE-REUNION-25.jpg"
                            link="#"
                        />
                    </div>
                </section>

                {/* Eventos pasados */}
                <section className="space-y-4">
                    <h2 className="flex items-center gap-2 text-2xl font-semibold">
                        <Archive className="h-6 w-6" />
                        Eventos pasados
                    </h2>
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

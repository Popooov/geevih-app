import EventCard from '@/components/event-card';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import { type EventPageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Archive, CalendarCheck, Filter } from 'lucide-react';
import { useMemo, useState } from 'react';

type FilterMode = 'all' | 'online' | 'presencial';

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
    return (
        <h2 className="mb-6 flex items-center gap-3 border-b border-border pb-2 text-2xl font-bold text-foreground">
            <Icon className="h-7 w-7 text-primary" />
            {title}
        </h2>
    );
}

function FilterPills({ value, onChange }: { value: FilterMode; onChange: (v: FilterMode) => void }) {
    const pillBase = 'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition';
    const pillActive = 'border-primary/50 bg-primary/10 text-primary';
    const pillIdle = 'border-border/70 bg-background text-foreground/80 hover:border-primary/40 hover:text-primary';

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Filter className="h-4 w-4" />
                Filtrar:
            </span>

            <button type="button" onClick={() => onChange('all')} className={`${pillBase} ${value === 'all' ? pillActive : pillIdle}`}>
                Todos
            </button>
            <button type="button" onClick={() => onChange('online')} className={`${pillBase} ${value === 'online' ? pillActive : pillIdle}`}>
                Online
            </button>
            <button type="button" onClick={() => onChange('presencial')} className={`${pillBase} ${value === 'presencial' ? pillActive : pillIdle}`}>
                Presenciales
            </button>
        </div>
    );
}

function EventCardSkeleton() {
    return (
        <Card className="overflow-hidden rounded-xl border border-border/70 bg-background shadow-sm">
            <div className="h-1 w-full bg-border" />
            <div className="relative h-52">
                <Skeleton className="h-full w-full" />
            </div>
            <div className="space-y-4 p-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-56" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="mt-2 h-5 w-32" />
            </div>
        </Card>
    );
}

/**
 * Returns the content configuration for each training category.
 */
function getCategoryContent(slug?: string | null) {
    switch (slug) {
        case 'cursos':
            return {
                title: 'Cursos',
                description:
                    'Explora la oferta de cursos orientados a la actualización y especialización de profesionales de enfermería en el ámbito del VIH.',
                upcomingTitle: 'Próximos cursos',
                pastTitle: 'Cursos anteriores',
                emptyUpcoming: 'No hay cursos programados próximamente.',
                emptyPast: 'No hay cursos anteriores registrados.',
            };

        case 'webinars':
            return {
                title: 'Webinars',
                description:
                    'Consulta los próximos webinars y sesiones online promovidos por GEEVIH para compartir conocimiento, evidencia y buenas prácticas.',
                upcomingTitle: 'Próximos webinars',
                pastTitle: 'Webinars anteriores',
                emptyUpcoming: 'No hay webinars programados próximamente.',
                emptyPast: 'No hay webinars anteriores registrados.',
            };

        case 'congresos-jornadas':
            return {
                title: 'Congresos y Jornadas',
                description:
                    'Consulta la agenda de congresos, jornadas, encuentros y actividades científicas relacionadas con la enfermería y el VIH.',
                upcomingTitle: 'Próximos congresos y eventos',
                pastTitle: 'Congresos y eventos anteriores',
                emptyUpcoming: 'No hay congresos o eventos programados próximamente.',
                emptyPast: 'No hay congresos o eventos anteriores registrados.',
            };

        case 'material-docente':
            return {
                title: 'Material Docente',
                description:
                    'Accede a actividades formativas y contenidos vinculados al material docente de apoyo para la práctica clínica y la formación continuada.',
                upcomingTitle: 'Próximo material docente',
                pastTitle: 'Material docente anterior',
                emptyUpcoming: 'No hay material docente publicado próximamente.',
                emptyPast: 'No hay material docente anterior registrado.',
            };

        case 'aval-de-geevih':
            return {
                title: 'Aval de GEEVIH',
                description: 'Consulta iniciativas, actividades y propuestas formativas relacionadas con el aval y respaldo institucional de GEEVIH.',
                upcomingTitle: 'Próximas actividades con aval',
                pastTitle: 'Actividades avaladas anteriores',
                emptyUpcoming: 'No hay actividades con aval programadas próximamente.',
                emptyPast: 'No hay actividades avaladas anteriores registradas.',
            };

        default:
            return {
                title: 'Formación',
                description: 'Consulta la agenda de cursos, webinars, congresos, material docente y actividades avaladas del Grupo GEEVIH.',
                upcomingTitle: 'Próximas actividades formativas',
                pastTitle: 'Actividades formativas anteriores',
                emptyUpcoming: 'No hay actividades formativas programadas.',
                emptyPast: 'No hay actividades formativas anteriores registradas.',
            };
    }
}

export default function Index() {
    const { upcomingEvents, pastEvents, currentCategory } = usePage<EventPageProps>().props;

    const [filter, setFilter] = useState<FilterMode>('all');

    const content = getCategoryContent(currentCategory?.slug);

    const filteredUpcoming = useMemo(() => {
        const list = upcomingEvents ?? [];
        if (filter === 'all') return list;
        if (filter === 'online') return list.filter((e) => e.is_online);
        return list.filter((e) => !e.is_online);
    }, [upcomingEvents, filter]);

    const filteredPast = useMemo(() => {
        const list = pastEvents ?? [];
        if (filter === 'all') return list;
        if (filter === 'online') return list.filter((e) => e.is_online);
        return list.filter((e) => !e.is_online);
    }, [pastEvents, filter]);

    const isLoading = !upcomingEvents || !pastEvents;

    return (
        <AppLayout>
            <Head title={content.title} />

            <div className="mx-auto max-w-6xl space-y-16 px-6 py-12">
                {/* Page header */}
                <header className="space-y-4 text-center">
                    <h1 className="text-5xl font-extrabold tracking-tight text-foreground">{content.title}</h1>

                    <p className="mx-auto max-w-3xl text-xl text-muted-foreground">{content.description}</p>

                    <div className="pt-8">
                        <FilterPills value={filter} onChange={setFilter} />
                    </div>
                </header>

                {/* Upcoming section */}
                <section className="space-y-8">
                    <SectionHeader icon={CalendarCheck} title={content.upcomingTitle} />

                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <EventCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : filteredUpcoming.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filteredUpcoming.map((event) => (
                                <EventCard
                                    key={event.id}
                                    titulo={event.titulo}
                                    fecha={event.fecha}
                                    hora={event.hora}
                                    descripcion={event.descripcion}
                                    imagen={event.imagen}
                                    enlace={event.link}
                                    lugar={event.lugar}
                                    is_online={event.is_online}
                                    registration_url={event.registration_url}
                                    online_url={event.online_url}
                                    isOngoing={event.isOngoing}
                                    isPast={event.isPast}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="py-10 text-center text-lg text-muted-foreground">{content.emptyUpcoming}</p>
                    )}
                </section>

                {/* Past section */}
                <section className="space-y-8">
                    <SectionHeader icon={Archive} title={content.pastTitle} />

                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <EventCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : filteredPast.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filteredPast.map((event) => (
                                <EventCard
                                    key={event.id}
                                    titulo={event.titulo}
                                    fecha={event.fecha}
                                    hora={event.hora}
                                    descripcion={event.descripcion}
                                    imagen={event.imagen}
                                    enlace={event.link}
                                    lugar={event.lugar}
                                    isPast={true}
                                    is_online={event.is_online}
                                    registration_url={event.registration_url}
                                    online_url={event.online_url}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="py-10 text-center text-lg text-muted-foreground">{content.emptyPast}</p>
                    )}
                </section>
            </div>
        </AppLayout>
    );
}

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

function EventCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'featured' }) {
    const headerH = variant === 'featured' ? 'h-60' : 'h-52';
    return (
        <Card className="overflow-hidden rounded-xl border border-border/70 bg-background shadow-sm">
            <div className="h-1 w-full bg-border" />
            <div className={`relative ${headerH}`}>
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

export default function Index() {
    const { upcomingEvents, pastEvents } = usePage<EventPageProps>().props;

    const [filter, setFilter] = useState<FilterMode>('all');

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

    // Evento destacado: el primero del listado filtrado de próximos
    const featured = filteredUpcoming.length > 0 ? filteredUpcoming[0] : null;
    const restUpcoming = featured ? filteredUpcoming.slice(1) : [];

    const isLoading = !upcomingEvents || !pastEvents;

    return (
        <AppLayout>
            <Head title="Eventos" />

            <div className="pt-10">
                <div className="mx-auto max-w-6xl space-y-16 p-6">
                    {/* Header */}
                    <header className="space-y-4 text-center">
                        <h1 className="text-5xl font-extrabold tracking-tight text-foreground">Eventos y Actividades</h1>
                        <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                            Consulta la agenda de congresos, seminarios, talleres y oportunidades de colaboración del Grupo GEEVIH.
                        </p>

                        <div className="pt-4">
                            <FilterPills value={filter} onChange={setFilter} />
                        </div>
                    </header>

                    {/* Próximos */}
                    <section className="space-y-8">
                        <SectionHeader icon={CalendarCheck} title="Próximos eventos" />

                        {isLoading ? (
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <EventCardSkeleton key={i} variant={i === 0 ? 'featured' : 'default'} />
                                ))}
                            </div>
                        ) : featured ? (
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {/* Destacado (misma grid, solo cambia variant) */}
                                <EventCard
                                    variant="featured"
                                    titulo={featured.titulo}
                                    fecha={featured.fecha}
                                    hora={featured.hora}
                                    descripcion={featured.descripcion}
                                    imagen={featured.imagen}
                                    enlace={featured.link}
                                    lugar={featured.lugar}
                                    is_online={featured.is_online}
                                    registration_url={featured.registration_url}
                                    online_url={featured.online_url}
                                    isOngoing={featured.isOngoing}
                                />

                                {restUpcoming.map((event) => (
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
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="py-10 text-center text-lg text-muted-foreground">No hay próximos eventos programados.</p>
                        )}
                    </section>

                    {/* Pasados */}
                    <section className="space-y-8">
                        <SectionHeader icon={Archive} title="Eventos pasados" />

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
                                        isPast
                                        is_online={event.is_online}
                                        registration_url={event.registration_url}
                                        online_url={event.online_url}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="py-10 text-center text-lg text-muted-foreground">No hay eventos pasados registrados.</p>
                        )}
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

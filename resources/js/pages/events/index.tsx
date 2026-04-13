import EventCard from '@/components/event-card';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import { type EventPageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Archive, CalendarCheck, Filter, Presentation } from 'lucide-react';
import { useMemo, useState } from 'react';

type FilterMode = 'all' | 'online' | 'presencial';

function FilterPills({ value, onChange }: { value: FilterMode; onChange: (v: FilterMode) => void }) {
    const base =
        'inline-flex h-9 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30';
    const active = 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950';
    const idle = 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground dark:bg-muted/60';

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 pr-1 text-sm font-medium text-muted-foreground">
                <Filter className="h-4 w-4" />
                Filtrar
            </span>

            <button type="button" onClick={() => onChange('all')} className={`${base} ${value === 'all' ? active : idle}`}>
                Todos
            </button>

            <button type="button" onClick={() => onChange('online')} className={`${base} ${value === 'online' ? active : idle}`}>
                Online
            </button>

            <button type="button" onClick={() => onChange('presencial')} className={`${base} ${value === 'presencial' ? active : idle}`}>
                Presenciales
            </button>
        </div>
    );
}

function EventCardSkeleton() {
    return (
        <Card className="overflow-hidden rounded-[2rem] border-0 bg-background shadow-[0_16px_40px_rgba(175,16,26,0.05)]">
            <div className="grid md:grid-cols-[0.92fr_1fr]">
                <Skeleton className="h-56 w-full md:h-full" />
                <div className="space-y-5 p-6 sm:p-7">
                    <Skeleton className="h-5 w-24 rounded-full" />
                    <Skeleton className="h-8 w-3/4" />
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-44" />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Skeleton className="h-11 w-32 rounded-xl" />
                        <Skeleton className="h-11 w-32 rounded-xl" />
                    </div>
                </div>
            </div>
        </Card>
    );
}

function SectionIntro({ icon: Icon, badge, title, description }: { icon: React.ElementType; badge: string; title: string; description: string }) {
    return (
        <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
                <Icon className="h-4 w-4" />
                {badge}
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>

            <p className="text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
        </div>
    );
}

function EmptyState({ text }: { text: string }) {
    return (
        <div className="rounded-[2rem] bg-background/70 px-6 py-10 text-center shadow-[0_14px_40px_rgba(175,16,26,0.03)] backdrop-blur sm:px-8">
            <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{text}</p>
        </div>
    );
}

function getCategoryContent(slug?: string | null) {
    switch (slug) {
        case 'cursos':
            return {
                title: 'Cursos',
                description: 'Formación especializada para la actualización clínica y el desarrollo profesional en el ámbito del VIH.',
                eyebrow: 'Formación especializada',
                upcomingBadge: 'Próximos',
                upcomingTitle: 'Próximos cursos',
                upcomingDescription: 'Actividades abiertas o próximas para seguir profundizando en el cuidado enfermero experto.',
                pastBadge: 'Archivo',
                pastTitle: 'Cursos anteriores',
                pastDescription: 'Archivo de actividades ya celebradas, útil para consulta y seguimiento histórico.',
                emptyUpcoming: 'No hay cursos programados próximamente.',
                emptyPast: 'No hay cursos anteriores registrados.',
            };

        case 'webinars':
            return {
                title: 'Webinars',
                description: 'Sesiones online para compartir evidencia, buenas prácticas y actualización científica en torno al VIH.',
                eyebrow: 'Sesiones online',
                upcomingBadge: 'Próximos',
                upcomingTitle: 'Próximos webinars',
                upcomingDescription: 'Encuentros virtuales y sesiones en directo impulsadas por GEEVIH.',
                pastBadge: 'Archivo',
                pastTitle: 'Webinars anteriores',
                pastDescription: 'Repositorio de webinars ya celebrados y actividades previas.',
                emptyUpcoming: 'No hay webinars programados próximamente.',
                emptyPast: 'No hay webinars anteriores registrados.',
            };

        case 'congresos-jornadas':
            return {
                title: 'Congresos y Jornadas',
                description: 'Agenda de encuentros científicos, jornadas y congresos vinculados a la enfermería y al VIH.',
                eyebrow: 'Encuentros científicos',
                upcomingBadge: 'Próximos',
                upcomingTitle: 'Próximos congresos y jornadas',
                upcomingDescription: 'Citas destacadas para la comunidad profesional y científica.',
                pastBadge: 'Archivo',
                pastTitle: 'Congresos y jornadas anteriores',
                pastDescription: 'Consulta actividades ya celebradas y revisa su histórico.',
                emptyUpcoming: 'No hay congresos o eventos programados próximamente.',
                emptyPast: 'No hay congresos o eventos anteriores registrados.',
            };

        case 'material-docente':
            return {
                title: 'Material Docente',
                description: 'Contenidos formativos de apoyo para la práctica clínica, la docencia y la actualización continuada.',
                eyebrow: 'Recursos docentes',
                upcomingBadge: 'Próximos',
                upcomingTitle: 'Próximo material docente',
                upcomingDescription: 'Nuevos contenidos y publicaciones formativas disponibles para consulta.',
                pastBadge: 'Archivo',
                pastTitle: 'Material docente anterior',
                pastDescription: 'Archivo de material formativo ya publicado.',
                emptyUpcoming: 'No hay material docente publicado próximamente.',
                emptyPast: 'No hay material docente anterior registrado.',
            };

        case 'aval-de-geevih':
            return {
                title: 'Aval de GEEVIH',
                description: 'Actividades, iniciativas y propuestas formativas con respaldo institucional del grupo.',
                eyebrow: 'Aval institucional',
                upcomingBadge: 'Próximos',
                upcomingTitle: 'Próximas actividades con aval',
                upcomingDescription: 'Acciones futuras respaldadas o avaladas por GEEVIH.',
                pastBadge: 'Archivo',
                pastTitle: 'Actividades avaladas anteriores',
                pastDescription: 'Histórico de propuestas avaladas y actividades ya realizadas.',
                emptyUpcoming: 'No hay actividades con aval programadas próximamente.',
                emptyPast: 'No hay actividades avaladas anteriores registradas.',
            };

        default:
            return {
                title: 'Formación',
                description:
                    'Consulta cursos, webinars, congresos, material docente y actividades avaladas orientadas al cuidado enfermero experto en VIH.',
                eyebrow: 'Agenda y recursos formativos',
                upcomingBadge: 'Próximos',
                upcomingTitle: 'Próximas actividades formativas',
                upcomingDescription: 'Cursos, sesiones y encuentros próximos para la actualización profesional.',
                pastBadge: 'Archivo',
                pastTitle: 'Archivo formativo',
                pastDescription: 'Repositorio histórico de actividades previas del grupo.',
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

            <div className="mx-auto max-w-7xl px-6 pt-6 pb-16 lg:px-8 lg:pt-10 lg:pb-20">
                <div className="space-y-12 lg:space-y-14">
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/92 px-6 py-6 shadow-[0_24px_80px_rgba(175,16,26,0.05)] backdrop-blur-xl dark:bg-zinc-950/85 sm:px-8 sm:py-7 lg:px-10">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(175,16,26,0.08),transparent_46%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(175,16,26,0.12),transparent_46%)]" />

                        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_280px] lg:items-start">
                            <div className="space-y-5">
                                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
                                    <Presentation className="h-4 w-4" />
                                    {content.eyebrow}
                                </div>

                                <div className="max-w-3xl space-y-3">
                                    <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{content.title}</h1>

                                    <p className="max-w-2xl text-sm leading-8 text-foreground/70 dark:text-zinc-300 sm:text-lg">{content.description}</p>
                                </div>
                            </div>

                            <div className="rounded-[1.5rem] bg-background p-5 shadow-[0_16px_40px_rgba(175,16,26,0.05)] dark:bg-zinc-950/95">
                                <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">Vista actual</p>

                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Próximas</span>
                                        <span className="text-lg font-semibold text-foreground">{filteredUpcoming.length}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Archivo</span>
                                        <span className="text-lg font-semibold text-foreground">{filteredPast.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative mt-6 pt-5">
                            <div className="h-px bg-border/40" />
                            <div className="pt-5">
                                <FilterPills value={filter} onChange={setFilter} />
                            </div>
                        </div>
                    </section>

                    <section className="space-y-8">
                        <SectionIntro
                            icon={CalendarCheck}
                            badge={content.upcomingBadge}
                            title={content.upcomingTitle}
                            description={content.upcomingDescription}
                        />

                        {isLoading ? (
                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <EventCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : filteredUpcoming.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
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
                            <EmptyState text={content.emptyUpcoming} />
                        )}
                    </section>

                    <section className="rounded-[2rem] bg-muted/25 px-4 py-8 sm:px-6 lg:px-8 lg:py-10 dark:bg-zinc-950/70">
                        <div className="space-y-8">
                            <SectionIntro icon={Archive} badge={content.pastBadge} title={content.pastTitle} description={content.pastDescription} />

                            {isLoading ? (
                                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <EventCardSkeleton key={i} />
                                    ))}
                                </div>
                            ) : filteredPast.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
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
                                <EmptyState text={content.emptyPast} />
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

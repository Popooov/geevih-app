import EventCard from '@/components/event-card';
import { siteButtonVariants } from '@/components/site-button';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type EventItem, type EventPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Archive, CalendarCheck, FileText, Filter, Presentation, Search } from 'lucide-react';
import { useRef, useState, type ReactNode } from 'react';

type FilterMode = 'all' | 'online' | 'presencial';

interface CategoryContent {
    title: string;
    description: string;
    eyebrow: string;
    upcomingTitle: string;
    pastTitle: string;
    emptyTitle: string;
}

function getCategoryContent(slug?: string | null): CategoryContent {
    switch (slug) {
        case 'cursos':
            return {
                title: 'Cursos',
                description: 'Formación especializada para la actualización clínica y el desarrollo profesional en el ámbito del VIH.',
                eyebrow: 'Formación especializada',
                upcomingTitle: 'Cursos próximos y en curso',
                pastTitle: 'Cursos anteriores',
                emptyTitle: 'Todavía no hay cursos publicados',
            };
        case 'webinars':
            return {
                title: 'Webinars',
                description: 'Sesiones online para compartir evidencia, buenas prácticas y actualización científica en torno al VIH.',
                eyebrow: 'Sesiones online',
                upcomingTitle: 'Webinars próximos y en curso',
                pastTitle: 'Webinars anteriores',
                emptyTitle: 'Todavía no hay webinars publicados',
            };
        case 'congresos-jornadas':
            return {
                title: 'Congresos y Jornadas',
                description: 'Agenda de encuentros científicos, jornadas y congresos vinculados a la enfermería y al VIH.',
                eyebrow: 'Encuentros científicos',
                upcomingTitle: 'Próximos encuentros y actividades en curso',
                pastTitle: 'Congresos y jornadas anteriores',
                emptyTitle: 'Todavía no hay congresos ni jornadas publicados',
            };
        case 'material-docente':
            return {
                title: 'Material docente',
                description: 'Contenidos formativos de apoyo para la práctica clínica, la docencia y la actualización continuada.',
                eyebrow: 'Recursos docentes',
                upcomingTitle: 'Material disponible',
                pastTitle: 'Material disponible',
                emptyTitle: 'Todavía no hay material docente publicado',
            };
        case 'aval-de-geevih':
            return {
                title: 'Aval de GEEVIH',
                description: 'Actividades, iniciativas y propuestas formativas con respaldo institucional del grupo.',
                eyebrow: 'Aval institucional',
                upcomingTitle: 'Actividades con aval próximas y en curso',
                pastTitle: 'Actividades avaladas anteriores',
                emptyTitle: 'Todavía no hay actividades con aval publicadas',
            };
        default:
            return {
                title: 'Formación',
                description: 'Consulta cursos, webinars, congresos y contenidos docentes para la actualización profesional en enfermería y VIH.',
                eyebrow: 'Agenda y recursos formativos',
                upcomingTitle: 'Actividades próximas y en curso',
                pastTitle: 'Archivo formativo',
                emptyTitle: 'Todavía no hay actividades formativas publicadas',
            };
    }
}

function normalizeSearch(value: string) {
    return value
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLocaleLowerCase('es')
        .trim();
}

function filterEvents(events: EventItem[], query: string, year: string, mode: FilterMode) {
    const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
    return events.filter((event) => {
        const text = normalizeSearch([event.titulo, event.descripcion ?? ''].join(' '));
        const matchesSearch = terms.every((term) => text.includes(term));
        const matchesYear = year === 'all' || String(event.year) === year;
        const matchesMode = mode === 'all' || (mode === 'online' ? event.is_online === true : event.is_online === false);
        return matchesSearch && matchesYear && matchesMode;
    });
}

function FilterPills({ value, onChange }: { value: FilterMode; onChange: (value: FilterMode) => void }) {
    const options: { value: FilterMode; label: string }[] = [
        { value: 'all', label: 'Todas' },
        { value: 'online', label: 'Online' },
        { value: 'presencial', label: 'Presenciales' },
    ];
    return (
        <div role="group" aria-label="Modalidad de la actividad" className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 pr-1 text-sm font-medium text-muted-foreground dark:text-zinc-400">
                <Filter aria-hidden="true" className="h-4 w-4" />
                Modalidad
            </span>
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    aria-pressed={value === option.value}
                    aria-controls="training-results"
                    onClick={() => onChange(option.value)}
                    className={cn(siteButtonVariants({ variant: value === option.value ? 'primary' : 'secondary' }))}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

function SectionIntro({ icon: Icon, badge, title }: { icon: React.ElementType; badge: string; title: string }) {
    return (
        <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
                <Icon aria-hidden="true" className="h-4 w-4" />
                {badge}
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl dark:text-white">{title}</h2>
        </div>
    );
}

function EmptyState({ title, description, children }: { title: string; description?: string; children?: ReactNode }) {
    return (
        <div className="rounded-[2rem] bg-background/80 px-6 py-10 text-center shadow-[0_14px_40px_rgba(175,16,26,0.03)] backdrop-blur sm:px-8 dark:bg-zinc-950/90">
            <div className="mx-auto max-w-2xl space-y-3">
                <h2 className="text-lg font-semibold text-foreground dark:text-white">{title}</h2>
                {description && <p className="text-sm leading-7 text-foreground/70 sm:text-base dark:text-zinc-300">{description}</p>}
                {children && <div className="flex flex-wrap justify-center gap-3 pt-3">{children}</div>}
            </div>
        </div>
    );
}

function EventGrid({ events, priority = false, isPast }: { events: EventItem[]; priority?: boolean; isPast?: boolean }) {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {events.map((event, index) => (
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
                    isPast={isPast ?? event.isPast}
                    priority={priority && index < 2}
                />
            ))}
        </div>
    );
}

const actionClass = siteButtonVariants({ variant: 'secondary' });

function TrainingListing({ upcomingEvents = [], pastEvents = [], currentCategory = null }: EventPageProps) {
    const [query, setQuery] = useState('');
    const [year, setYear] = useState('all');
    const [mode, setMode] = useState<FilterMode>('all');
    const searchInput = useRef<HTMLInputElement>(null);
    const isMaterial = currentCategory?.slug === 'material-docente';
    const content = getCategoryContent(currentCategory?.slug);
    const allEvents = [...upcomingEvents, ...pastEvents];
    const years = [...new Set(allEvents.map((event) => event.year).filter((value): value is number => typeof value === 'number'))].sort(
        (a, b) => b - a,
    );
    const showModeFilter =
        !isMaterial &&
        currentCategory?.slug !== 'webinars' &&
        allEvents.some((event) => event.is_online === true) &&
        allEvents.some((event) => event.is_online === false);
    const activeMode = showModeFilter ? mode : 'all';
    const activeYear = !isMaterial && years.some((value) => String(value) === year) ? year : 'all';
    const hasFilters = normalizeSearch(query).length > 0 || activeYear !== 'all' || activeMode !== 'all';
    const filteredUpcoming = filterEvents(upcomingEvents, query, activeYear, activeMode);
    const filteredPast = filterEvents(pastEvents, query, activeYear, activeMode);
    const filteredMaterials = [...filteredUpcoming, ...filteredPast];
    const resultCount = filteredUpcoming.length + filteredPast.length;

    function clearFilters() {
        setQuery('');
        setYear('all');
        setMode('all');
        searchInput.current?.focus();
    }

    return (
        <AppLayout>
            <Head title={content.title} />
            <div className="site-page">
                <div className="site-stack">
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/92 px-5 py-6 shadow-[0_24px_80px_rgba(175,16,26,0.05)] backdrop-blur-xl sm:px-7 sm:py-7 lg:px-8 lg:mt-8 dark:bg-zinc-950/85">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(175,16,26,0.08),transparent_46%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(175,16,26,0.14),transparent_46%)]" />
                        <div
                            className={cn(
                                'relative grid gap-6',
                                !isMaterial && allEvents.length > 0 && 'lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start',
                            )}
                        >
                            <div className="space-y-5">
                                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-primary uppercase sm:text-[11px]">
                                    <Presentation aria-hidden="true" className="h-4 w-4" />
                                    {content.eyebrow}
                                </div>
                                <div className="max-w-3xl space-y-3">
                                    <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl xl:text-5xl dark:text-white">
                                        {content.title}
                                    </h1>
                                    <p className="max-w-2xl text-sm leading-7 text-foreground/70 sm:text-base xl:text-lg dark:text-zinc-300">
                                        {content.description}
                                    </p>
                                </div>
                            </div>
                            {!isMaterial && allEvents.length > 0 && (
                                <div className="rounded-[1.5rem] bg-background p-5 shadow-[0_16px_40px_rgba(175,16,26,0.05)] dark:bg-zinc-950/95">
                                    <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">Vista actual</p>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-sm text-muted-foreground dark:text-zinc-400">Próximas y en curso</span>
                                            <span className="text-lg font-semibold text-foreground dark:text-white">{filteredUpcoming.length}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-sm text-muted-foreground dark:text-zinc-400">Archivo</span>
                                            <span className="text-lg font-semibold text-foreground dark:text-white">{filteredPast.length}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {allEvents.length > 0 && (
                            <div className="relative mt-6 space-y-4 border-t border-border/40 pt-5 dark:border-zinc-800">
                                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                                    <div className="min-w-0 space-y-2">
                                        <label htmlFor="training-search" className="block text-sm font-medium text-foreground">
                                            {isMaterial ? 'Buscar material docente' : 'Buscar actividades'}
                                        </label>
                                        <div className="relative">
                                            <Search
                                                aria-hidden="true"
                                                className="pointer-events-none absolute top-3.5 left-3 h-4 w-4 text-muted-foreground"
                                            />
                                            <input
                                                ref={searchInput}
                                                id="training-search"
                                                type="search"
                                                value={query}
                                                onChange={(event) => setQuery(event.target.value)}
                                                placeholder="Título o descripción"
                                                aria-controls="training-results"
                                                className="min-h-11 w-full rounded-xl border border-border bg-background py-2 pr-3 pl-10 text-base text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                                            />
                                        </div>
                                    </div>
                                    {!isMaterial && years.length > 0 && (
                                        <div className="space-y-2">
                                            <label htmlFor="training-year" className="block text-sm font-medium text-foreground">
                                                Año de inicio
                                            </label>
                                            <select
                                                id="training-year"
                                                value={activeYear}
                                                onChange={(event) => setYear(event.target.value)}
                                                aria-controls="training-results"
                                                className="min-h-11 w-full rounded-xl border border-border bg-background px-3 py-2 text-base text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:min-w-40"
                                            >
                                                <option value="all">Todos los años</option>
                                                {years.map((value) => (
                                                    <option key={value} value={value}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                                {showModeFilter && <FilterPills value={activeMode} onChange={setMode} />}
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <p role="status" aria-atomic="true" className="text-sm text-muted-foreground dark:text-zinc-300">
                                        Mostrando {resultCount} de {allEvents.length}{' '}
                                        {isMaterial
                                            ? allEvents.length === 1
                                                ? 'material'
                                                : 'materiales'
                                            : allEvents.length === 1
                                              ? 'actividad'
                                              : 'actividades'}
                                    </p>
                                    {hasFilters && (
                                        <button type="button" onClick={clearFilters} className={actionClass}>
                                            Restablecer filtros
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>

                    <div id="training-results" className="space-y-10 lg:space-y-12">
                        {allEvents.length === 0 ? (
                            <EmptyState
                                title={content.emptyTitle}
                                description={
                                    isMaterial
                                        ? 'Mientras tanto, puedes consultar las guías y protocolos o la biblioteca científica.'
                                        : 'Puedes consultar otras actividades y los recursos del grupo.'
                                }
                            >
                                {isMaterial ? (
                                    <>
                                        <Link href="/recursos/guias" className={actionClass}>
                                            Guías y protocolos
                                        </Link>
                                        <Link href="/recursos/biblioteca" className={actionClass}>
                                            Biblioteca científica
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={currentCategory?.slug === 'cursos' ? '/formacion/webinars' : '/formacion/cursos'}
                                            className={actionClass}
                                        >
                                            {currentCategory?.slug === 'cursos' ? 'Consultar webinars' : 'Consultar cursos'}
                                        </Link>
                                        <Link href="/recursos/guias" className={actionClass}>
                                            Guías y protocolos
                                        </Link>
                                    </>
                                )}
                            </EmptyState>
                        ) : resultCount === 0 ? (
                            <EmptyState
                                title="No hay resultados con estos filtros"
                                description="Prueba otra búsqueda o restablece los filtros para ver todos los contenidos."
                            >
                                <button type="button" onClick={clearFilters} className={actionClass}>
                                    Restablecer filtros
                                </button>
                            </EmptyState>
                        ) : isMaterial ? (
                            <section className="space-y-7">
                                <SectionIntro icon={FileText} badge="Catálogo" title="Material disponible" />
                                <div className="grid gap-5 sm:grid-cols-2">
                                    {filteredMaterials.map((material) => (
                                        <article key={material.id} className="site-card p-5 sm:p-6">
                                            <FileText aria-hidden="true" className="mb-4 h-6 w-6 text-primary" />
                                            <h3 className="site-card-title">{material.titulo}</h3>
                                            {material.descripcion && <p className="mt-3 site-card-description">{material.descripcion}</p>}
                                            {material.link && (
                                                <div className="mt-auto pt-5">
                                                    <Link href={material.link} className={actionClass}>
                                                        Consultar material<span className="sr-only">: {material.titulo}</span>
                                                    </Link>
                                                </div>
                                            )}
                                        </article>
                                    ))}
                                </div>
                            </section>
                        ) : (
                            <>
                                <section className="space-y-7">
                                    <SectionIntro icon={CalendarCheck} badge="Próximas y en curso" title={content.upcomingTitle} />
                                    {filteredUpcoming.length > 0 ? (
                                        <EventGrid events={filteredUpcoming} priority />
                                    ) : (
                                        <p className="rounded-2xl bg-muted/40 px-6 py-5 text-sm leading-7 text-foreground/70 dark:text-zinc-300">
                                            {upcomingEvents.length === 0
                                                ? 'Actualmente no hay actividades próximas ni en curso en esta sección.'
                                                : 'No hay actividades próximas ni en curso que coincidan con los filtros seleccionados.'}
                                        </p>
                                    )}
                                </section>
                                <section className="space-y-7">
                                    <SectionIntro icon={Archive} badge="Archivo" title={content.pastTitle} />
                                    {filteredPast.length > 0 ? (
                                        <EventGrid events={filteredPast} isPast priority={filteredUpcoming.length === 0} />
                                    ) : (
                                        <p className="rounded-2xl bg-muted/40 px-6 py-5 text-sm leading-7 text-foreground/70 dark:text-zinc-300">
                                            {pastEvents.length === 0
                                                ? 'Todavía no hay actividades publicadas en el archivo de esta sección.'
                                                : 'No hay actividades anteriores que coincidan con los filtros seleccionados.'}
                                        </p>
                                    )}
                                </section>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default function Index() {
    const props = usePage<EventPageProps>().props;
    return <TrainingListing key={props.currentCategory?.slug ?? 'all'} {...props} />;
}

import { siteButtonVariants } from '@/components/site-button';
import AppLayout from '@/layouts/app-layout';
import { attendanceLabels, getAttendanceMode, matchesAttendanceMode } from '@/lib/events';
import { cn } from '@/lib/utils';
import { type EventTimeFact, type ShowEventPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, CalendarDays, Clock3, ExternalLink, Flag, Info, MapPin, type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

const fallbackImageSrc = '/images/event-placeholder.png';

function EventActions({
    registrationUrl,
    onlineUrl,
    programUrl,
}: {
    registrationUrl?: string | null;
    onlineUrl?: string | null;
    programUrl?: string | null;
}) {
    return (
        <div className="flex flex-col gap-3 @lg:flex-row @lg:flex-wrap">
            {registrationUrl && (
                <a href={registrationUrl} target="_blank" rel="noopener noreferrer" className={siteButtonVariants({ variant: 'primary' })}>
                    Inscribirse
                    <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
            )}

            {onlineUrl && (
                <a
                    href={onlineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={siteButtonVariants({ variant: registrationUrl ? 'secondary' : 'primary' })}
                >
                    Acceder online
                    <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
            )}

            {programUrl && (
                <a href={programUrl} target="_blank" rel="noopener noreferrer" className={siteButtonVariants({ variant: 'secondary' })}>
                    Ver programa
                    <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
            )}
        </div>
    );
}

function EventBadge({
    children,
    variant = 'category',
}: {
    children: ReactNode;
    variant?: 'category' | 'online' | 'inPerson' | 'hybrid' | 'ongoing' | 'finished';
}) {
    const styles = {
        category: 'bg-primary/10 text-primary dark:bg-primary/15 dark:text-red-200',
        online: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
        inPerson: 'bg-muted text-foreground',
        hybrid: 'bg-violet-100 text-violet-800 dark:bg-violet-400/15 dark:text-violet-200',
        ongoing: 'bg-emerald-700 text-white dark:bg-emerald-300 dark:text-zinc-950',
        finished: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900',
    };

    return (
        <span
            className={cn('inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase', styles[variant])}
        >
            {children}
        </span>
    );
}

function EventFact({ icon: Icon, label, value, className }: { icon: LucideIcon; label: string; value: string; className?: string }) {
    return (
        <div className={cn('relative min-w-0 pl-11', className)}>
            <dt className="text-xs leading-4 font-medium text-muted-foreground">
                <span aria-hidden="true" className="absolute top-1 left-0 grid size-8 place-items-center rounded-xl bg-muted/80">
                    <Icon className="size-4" />
                </span>
                {label}
            </dt>
            <dd className="mt-0.5 text-sm leading-5 font-medium break-words whitespace-pre-line text-foreground">{value}</dd>
        </div>
    );
}

export default function Show() {
    const { event } = usePage<ShowEventPageProps>().props;

    const imageSrc = event.imagen?.trim() || fallbackImageSrc;
    const description = event.descripcion?.trim();
    const content = event.contenido?.trim();
    const isPast = Boolean(event.isPast);
    const registrationUrl = isPast ? null : event.registration_url;
    const mode = getAttendanceMode(event) ?? 'in_person';
    const onlineUrl = matchesAttendanceMode(event, 'online') ? event.online_url : null;
    const programUrl = event.program_url;
    const timeFacts: EventTimeFact[] = event.horarios ?? [
        ...(event.hora ? [{ tipo: 'inicio' as const, etiqueta: event.fin ? 'Inicio' : 'Horario', valor: event.hora }] : []),
        ...(event.fin ? [{ tipo: 'fin' as const, etiqueta: 'Fin', valor: event.fin }] : []),
    ];

    const backHref = event.backLink ?? '/formacion';
    const backLabel = event.category ? `Volver a ${event.category}` : 'Volver a formación';

    return (
        <AppLayout>
            <Head title={event.titulo} />

            <div className="site-page">
                <div className="space-y-6 lg:space-y-8 lg:pt-8">
                    <div>
                        <Link
                            href={backHref}
                            className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                            {backLabel}
                        </Link>
                    </div>

                    <section
                        aria-labelledby="event-title"
                        className="relative isolate grid items-center gap-6 overflow-hidden rounded-[2rem] bg-card p-5 sm:p-7 lg:grid-cols-2 lg:gap-10 lg:p-8"
                    >
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(175,16,26,0.08),transparent_55%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(175,16,26,0.16),transparent_55%)]"
                        />

                        <div className="flex min-w-0 justify-center">
                            <img
                                src={imageSrc}
                                alt={event.titulo}
                                width={1040}
                                height={585}
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                className="h-auto max-h-[30rem] w-auto max-w-full rounded-[1.25rem] shadow-[0_12px_32px_rgba(175,16,26,0.08)] sm:rounded-[1.75rem]"
                                onError={({ currentTarget }) => {
                                    if (currentTarget.getAttribute('src') !== fallbackImageSrc) {
                                        currentTarget.src = fallbackImageSrc;
                                    }
                                }}
                            />
                        </div>

                        <div className="min-w-0 space-y-5 lg:order-first">
                            <div className="flex flex-wrap items-center gap-2">
                                {event.category && <EventBadge>{event.category}</EventBadge>}
                                <EventBadge variant={mode === 'hybrid' ? 'hybrid' : mode === 'online' ? 'online' : 'inPerson'}>
                                    {attendanceLabels[mode]}
                                </EventBadge>
                                {isPast && <EventBadge variant="finished">{event.status_label ?? 'Finalizado'}</EventBadge>}
                                {!isPast && event.isOngoing && <EventBadge variant="ongoing">{event.status_label ?? 'En curso'}</EventBadge>}
                            </div>

                            <h1
                                id="event-title"
                                className="text-2xl leading-tight font-semibold tracking-tight break-words text-foreground sm:text-3xl lg:text-4xl"
                            >
                                {event.titulo}
                            </h1>

                            {description && <p className="max-w-[65ch] text-base leading-7 break-words text-muted-foreground">{description}</p>}
                        </div>
                    </section>

                    <div className={cn('grid items-start gap-6 lg:gap-8 lg:px-8', content && 'lg:grid-cols-[minmax(0,1fr)_minmax(16rem,30%)]')}>
                        <aside
                            aria-labelledby="event-facts"
                            className="@container min-w-0 space-y-5 rounded-3xl bg-muted/45 p-5 sm:p-7 lg:order-last lg:p-6"
                        >
                            <h2 id="event-facts" className="text-lg font-semibold tracking-tight text-foreground">
                                Ficha del evento
                            </h2>

                            <div className="flex flex-col gap-5 md:max-lg:flex-row md:max-lg:items-center">
                                <dl className="flex min-w-0 flex-wrap gap-x-6 gap-y-4 md:max-lg:flex-1">
                                    <EventFact
                                        icon={Calendar}
                                        label={event.fecha_label ?? 'Fecha'}
                                        value={event.fecha}
                                        className={cn('w-full', timeFacts.length < 2 && '@lg:w-auto')}
                                    />
                                    {timeFacts.map((fact) => (
                                        <EventFact
                                            key={fact.tipo}
                                            icon={
                                                fact.tipo === 'fin'
                                                    ? Flag
                                                    : fact.tipo === 'sesiones'
                                                      ? CalendarDays
                                                      : fact.tipo === 'nota'
                                                        ? Info
                                                        : Clock3
                                            }
                                            label={fact.etiqueta}
                                            value={fact.valor}
                                            className={
                                                timeFacts.length > 1 || fact.tipo === 'sesiones' || fact.tipo === 'nota' ? 'w-full' : 'min-w-24'
                                            }
                                        />
                                    ))}
                                    {matchesAttendanceMode(event, 'in_person') && (
                                        <EventFact
                                            icon={MapPin}
                                            label="Lugar"
                                            value={event.lugar || 'Ubicación por confirmar'}
                                            className="w-full @lg:w-auto"
                                        />
                                    )}
                                </dl>

                                {(registrationUrl || onlineUrl || programUrl) && (
                                    <div className="@container md:max-lg:w-48 md:max-lg:shrink-0">
                                        <EventActions registrationUrl={registrationUrl} onlineUrl={onlineUrl} programUrl={programUrl} />
                                    </div>
                                )}
                            </div>
                        </aside>

                        {content && (
                            <section aria-labelledby="event-details" className="min-w-0 space-y-5 px-5 sm:px-7 lg:px-0">
                                <h2 id="event-details" className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                                    Información del evento
                                </h2>
                                <div
                                    className="prose overflow-x-auto [overflow-wrap:anywhere] prose-slate lg:max-w-none dark:prose-invert"
                                    dangerouslySetInnerHTML={{ __html: content }}
                                />
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

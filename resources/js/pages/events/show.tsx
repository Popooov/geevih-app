import { siteButtonVariants } from '@/components/site-button';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type ShowEventPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock3, ExternalLink, Flag, MapPin, type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

const fallbackImageSrc = '/images/event-placeholder.png';

function EventActions({ registrationUrl, onlineUrl }: { registrationUrl?: string | null; onlineUrl?: string | null }) {
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
        </div>
    );
}

function EventBadge({
    children,
    variant = 'category',
}: {
    children: ReactNode;
    variant?: 'category' | 'online' | 'inPerson' | 'ongoing' | 'finished';
}) {
    const styles = {
        category: 'bg-primary/10 text-primary dark:bg-primary/15 dark:text-red-200',
        online: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
        inPerson: 'bg-muted text-foreground',
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
            <dd className="mt-0.5 text-sm leading-5 font-medium break-words text-foreground">{value}</dd>
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
    const onlineUrl = event.online_url;

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
                                <EventBadge variant={event.is_online ? 'online' : 'inPerson'}>{event.is_online ? 'Online' : 'Presencial'}</EventBadge>
                                {isPast && <EventBadge variant="finished">Finalizado</EventBadge>}
                                {!isPast && event.isOngoing && <EventBadge variant="ongoing">En curso</EventBadge>}
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

                            <dl className="flex flex-wrap gap-x-6 gap-y-4">
                                <EventFact icon={Calendar} label="Fecha" value={event.fecha} className={cn('w-full', !event.fin && '@lg:w-auto')} />
                                {event.hora && (
                                    <EventFact icon={Clock3} label={event.fin ? 'Inicio' : 'Horario'} value={event.hora} className="min-w-24" />
                                )}
                                {event.fin && <EventFact icon={Flag} label="Fin" value={event.fin} />}
                                {!event.is_online && (
                                    <EventFact
                                        icon={MapPin}
                                        label="Lugar"
                                        value={event.lugar || 'Ubicación por confirmar'}
                                        className="w-full @lg:w-auto"
                                    />
                                )}
                            </dl>

                            {(registrationUrl || onlineUrl) && <EventActions registrationUrl={registrationUrl} onlineUrl={onlineUrl} />}
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

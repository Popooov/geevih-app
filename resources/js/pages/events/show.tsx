import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type ShowEventPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock3, MapPin } from 'lucide-react';

function EventBadge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'secondary' | 'live' }) {
    const styles = {
        default: 'bg-primary/10 text-primary dark:bg-primary/15 dark:text-red-200',
        secondary: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
        live: 'bg-emerald-600 text-white dark:bg-emerald-500',
    };

    return (
        <span
            className={cn('inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase', styles[variant])}
        >
            {children}
        </span>
    );
}

function MetaItem({ icon: Icon, children, className }: { icon: React.ElementType; children: React.ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                'flex min-w-0 items-center gap-3 px-1 py-3 text-xs leading-5 text-foreground/70 md:rounded-2xl md:bg-zinc-50/90 md:px-4 md:text-base md:shadow-[0_8px_24px_rgba(175,16,26,0.025)] dark:text-zinc-300 md:dark:bg-zinc-900/60',
                className,
            )}
        >
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 sm:h-9 sm:w-9 md:bg-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-300">
                <Icon className="h-4 w-4" />
            </span>

            <span className="min-w-0 flex-1 break-words">{children}</span>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="space-y-1">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase dark:text-zinc-500">{label}</p>
            <p className="text-sm leading-6 text-foreground dark:text-white">{value}</p>
        </div>
    );
}

export default function Show() {
    const { event } = usePage<ShowEventPageProps>().props;

    const imageSrc = event.imagen?.trim() ? event.imagen : '/images/event-placeholder.png';
    const isPast = Boolean(event.isPast);
    const canRegister = !isPast && Boolean(event.registration_url);
    const canAccessOnline = Boolean(event.online_url);
    const hasCtas = canRegister || canAccessOnline;

    const backHref = event.backLink ?? '/formacion';
    const backLabel = event.category ? `Volver a ${event.category}` : 'Volver a formación';

    return (
        <AppLayout>
            <Head title={event.titulo} />

            <div className="mx-auto max-w-7xl px-5 pt-6 pb-16 sm:px-6 lg:px-8 lg:pt-10 lg:pb-20">
                <div className="space-y-10 lg:space-y-12">
                    {/* BACK */}
                    <div>
                        <Link
                            href={backHref}
                            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            {backLabel}
                        </Link>
                    </div>

                    {/* HERO */}
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/92 px-5 py-6 shadow-[0_24px_80px_rgba(175,16,26,0.05)] backdrop-blur-xl sm:px-8 sm:py-8 lg:px-9 xl:px-8 dark:bg-zinc-950/85">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(175,16,26,0.08),transparent_46%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(175,16,26,0.14),transparent_46%)]" />

                        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1fr)] lg:items-start xl:grid-cols-[minmax(0,1fr)_520px]">
                            {/* TOP INFO */}
                            <div className="space-y-6">
                                <div className="flex flex-wrap items-center gap-2 lg:hidden">
                                    {event.category && <EventBadge>{event.category}</EventBadge>}
                                    {event.is_online && <EventBadge variant="secondary">Online</EventBadge>}
                                    {event.isOngoing && <EventBadge variant="live">En curso</EventBadge>}
                                </div>

                                <div className="max-w-2xl space-y-4 lg:max-w-xl xl:max-w-2xl">
                                    <h1 className="text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl dark:text-white">
                                        {event.titulo}
                                    </h1>

                                    {event.descripcion && (
                                        <p className="max-w-2xl text-sm leading-7 text-foreground/65 sm:text-[0.95rem] dark:text-zinc-300">
                                            {event.descripcion}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* MEDIA */}
                            <div className="space-y-4 lg:self-start">
                                <div className="relative mx-auto w-full max-w-[620px] overflow-hidden rounded-[1.75rem] bg-muted shadow-[0_22px_55px_rgba(175,16,26,0.10)] lg:mx-0 lg:max-w-[520px] dark:bg-zinc-900">
                                    <img
                                        src={imageSrc}
                                        alt={event.titulo}
                                        width={1040}
                                        height={585}
                                        sizes="(min-width: 1280px) 520px, (min-width: 1024px) 50vw, 100vw"
                                        loading="eager"
                                        fetchPriority="high"
                                        decoding="async"
                                        className="aspect-video h-auto w-full object-cover object-center"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = '/images/event-placeholder.png';
                                        }}
                                    />

                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-transparent" />
                                </div>

                                <div className="hidden rounded-[1.5rem] bg-white/65 px-4 py-4 shadow-[0_12px_34px_rgba(175,16,26,0.04)] backdrop-blur-sm lg:block dark:bg-zinc-900/45">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {event.is_online ? (
                                            <EventBadge variant="secondary">Actividad online</EventBadge>
                                        ) : (
                                            <EventBadge variant="secondary">Actividad presencial</EventBadge>
                                        )}
                                        {event.isOngoing && <EventBadge variant="live">En curso</EventBadge>}
                                    </div>
                                </div>
                            </div>

                            {/* META ROW */}
                            <div className="rounded-[1.75rem] bg-white/70 px-4 py-2 shadow-[0_14px_36px_rgba(175,16,26,0.035)] backdrop-blur-sm md:bg-white/55 md:p-3 lg:col-span-2 dark:bg-zinc-900/35">
                                <div className="divide-y divide-zinc-200/60 md:grid md:grid-cols-12 md:gap-3 md:divide-y-0 dark:divide-zinc-800/70">
                                    <MetaItem icon={MapPin} className="md:col-span-12 xl:col-span-5">
                                        {event.is_online ? 'Online' : event.lugar || 'Ubicación por confirmar'}
                                    </MetaItem>

                                    <MetaItem icon={Calendar} className="md:col-span-8 xl:col-span-5">
                                        {event.fecha}
                                    </MetaItem>

                                    {event.hora && (
                                        <MetaItem icon={Clock3} className="md:col-span-4 xl:col-span-2">
                                            {event.hora}
                                        </MetaItem>
                                    )}

                                    {/* {event.online_url && event.is_online && (
                                        <MetaItem icon={Globe} className="md:col-span-12 xl:col-span-12">
                                            Acceso online disponible
                                        </MetaItem>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* MAIN */}
                    <main className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px]">
                        {/* CONTENT */}
                        <section>
                            <div className="rounded-[2rem] bg-background px-6 py-7 shadow-[0_16px_40px_rgba(175,16,26,0.05)] sm:px-8 sm:py-8 dark:bg-zinc-950/95">
                                <div className="space-y-3">
                                    <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
                                        Detalle
                                    </div>

                                    <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl dark:text-white">
                                        Información del evento
                                    </h2>

                                    <p className="text-sm text-foreground/65 dark:text-zinc-300">Información completa y contexto de la actividad.</p>
                                </div>

                                <div className="mt-8">
                                    {event.contenido ? (
                                        <div className="prose prose-slate dark:prose-invert max-w-none">
                                            <div dangerouslySetInnerHTML={{ __html: event.contenido }} />
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground">No hay contenido adicional.</p>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* SIDEBAR */}
                        <aside className="space-y-6 lg:sticky lg:top-6">
                            {/* CTAs */}
                            {hasCtas && (
                                <div className="rounded-[1.75rem] bg-background px-5 py-5 shadow-[0_16px_40px_rgba(175,16,26,0.05)] sm:px-6 dark:bg-zinc-950/95">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-stretch">
                                        <div className="space-y-1">
                                            <h3 className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Acciones</h3>

                                            <p className="max-w-sm text-sm leading-6 text-foreground/60 lg:max-w-none dark:text-zinc-400">
                                                Gestiona tu participación en esta actividad.
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
                                            {canRegister && event.registration_url && (
                                                <a
                                                    href={event.registration_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-zinc-50 shadow-sm transition-all duration-200 hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-500/50 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto sm:min-w-40 lg:w-full dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-950"
                                                >
                                                    Inscribirse
                                                </a>
                                            )}

                                            {canAccessOnline && event.online_url && (
                                                <a
                                                    href={event.online_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-zinc-200/60 bg-zinc-50/50 px-5 text-sm font-semibold text-zinc-700 transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-500/30 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto sm:min-w-40 lg:w-full dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 dark:focus-visible:ring-offset-zinc-950"
                                                >
                                                    Acceder online
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* INFO */}
                            <div className="rounded-[1.75rem] bg-background p-6 shadow-[0_16px_40px_rgba(175,16,26,0.05)] dark:bg-zinc-950/95">
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase">Ficha</h3>

                                <div className="mt-5 space-y-4">
                                    <InfoRow label="Fecha" value={event.fecha} />

                                    {event.hora && <InfoRow label="Hora" value={event.hora} />}

                                    <InfoRow label="Modalidad" value={event.is_online ? 'Online' : 'Presencial'} />

                                    <InfoRow label="Lugar" value={event.is_online ? 'Online' : event.lugar || '—'} />

                                    {event.fin && <InfoRow label="Fin" value={event.fin} />}
                                </div>
                            </div>

                            {/* BACK */}
                            <div className="rounded-[1.75rem] bg-background p-6 shadow-[0_16px_40px_rgba(175,16,26,0.05)] dark:bg-zinc-950/95">
                                <Link
                                    href={backHref}
                                    className="flex items-center justify-center gap-2 text-sm font-medium transition hover:text-primary"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    {backLabel}
                                </Link>
                            </div>
                        </aside>
                    </main>
                </div>
            </div>
        </AppLayout>
    );
}

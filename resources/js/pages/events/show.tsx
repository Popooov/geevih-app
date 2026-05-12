import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type ShowEventPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock3, Globe, MapPin } from 'lucide-react';

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

function MetaItem({
    icon: Icon,
    children,
    className,
}: {
    icon: React.ElementType;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'flex min-w-0 items-center gap-3 rounded-2xl bg-zinc-50/90 px-4 py-3 text-sm text-foreground/70 shadow-[0_8px_24px_rgba(175,16,26,0.025)] dark:bg-zinc-900/60 dark:text-zinc-300',
                className,
            )}
        >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-200/80 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                <Icon className="h-4 w-4" />
            </span>

            <span className="min-w-0 flex-1 leading-6 break-words">
                {children}
            </span>
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

    const imageSrc = event.imagen?.trim() ? event.imagen : '/images/evento-placeholder.jpg';
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

                        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,500px)] lg:items-start xl:grid-cols-[minmax(0,1fr)_520px]">
                            {/* TOP INFO */}
                            <div className="space-y-6">
                                <div className="flex flex-wrap items-center gap-2">
                                    {event.category && <EventBadge>{event.category}</EventBadge>}
                                    {event.is_online && <EventBadge variant="secondary">Online</EventBadge>}
                                    {event.isOngoing && <EventBadge variant="live">En curso</EventBadge>}
                                </div>

                                <div className="max-w-2xl space-y-4">
                                    <h1 className="text-[1.85rem] leading-[1.1] font-semibold tracking-tight text-foreground sm:text-[2rem] lg:text-[2.05rem] xl:text-[2.25rem] dark:text-white">
                                        {event.titulo}
                                    </h1>

                                    {event.descripcion && (
                                        <p className="max-w-2xl text-sm leading-7 text-foreground/65 sm:text-[0.95rem] dark:text-zinc-300">
                                            {event.descripcion}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* IMAGE */}
                            <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[1.75rem] bg-muted shadow-[0_22px_55px_rgba(175,16,26,0.10)] lg:mx-0 dark:bg-zinc-900">
                                <img
                                    src={imageSrc}
                                    alt={event.titulo}
                                    className="aspect-video h-auto w-full object-cover object-center"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = '/images/evento-placeholder.jpg';
                                    }}
                                />

                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-transparent" />
                            </div>

                            {/* META ROW */}
                            <div className="rounded-[1.75rem] bg-white/55 p-3 shadow-[0_14px_36px_rgba(175,16,26,0.035)] backdrop-blur-sm lg:col-span-2 dark:bg-zinc-900/35">
                                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-12">
                                    <MetaItem icon={MapPin} className="xl:col-span-5">
                                        {event.is_online ? 'Online' : event.lugar || 'Ubicación por confirmar'}
                                    </MetaItem>

                                    <MetaItem icon={Calendar} className="xl:col-span-5">
                                        {event.fecha}
                                    </MetaItem>

                                    {event.hora && (
                                        <MetaItem icon={Clock3} className="md:col-span-2 xl:col-span-2">
                                            {event.hora}
                                        </MetaItem>
                                    )}

                                    {event.online_url && event.is_online && (
                                        <MetaItem icon={Globe} className="md:col-span-2 xl:col-span-12">
                                            Acceso online disponible
                                        </MetaItem>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* MAIN */}
                    <main className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
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
                                <div className="rounded-[1.75rem] bg-background p-6 xl:px-8 shadow-[0_16px_40px_rgba(175,16,26,0.05)] dark:bg-zinc-950/95">
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase">Acciones</h3>

                                    <div className="mt-4 flex flex-col gap-3">
                                        {canRegister && event.registration_url && (
                                            <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                                                <button className="h-11 w-full cursor-pointer rounded-xl bg-zinc-950 text-white transition hover:bg-primary dark:bg-white dark:text-zinc-950 dark:hover:bg-primary dark:hover:text-white">
                                                    Inscribirse
                                                </button>
                                            </a>
                                        )}

                                        {canAccessOnline && event.online_url && (
                                            <a href={event.online_url} target="_blank" rel="noopener noreferrer">
                                                <button className="h-11 w-full cursor-pointer rounded-xl bg-primary/5 text-[#005f7b] transition hover:bg-primary/10 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-500/15">
                                                    Acceder online
                                                </button>
                                            </a>
                                        )}
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
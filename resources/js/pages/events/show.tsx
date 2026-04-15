import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type ShowEventPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock3, Globe, MapPin } from 'lucide-react';

function EventBadge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'secondary' | 'live' }) {
    const styles = {
        default: 'bg-primary/10 text-primary',
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

function MetaItem({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 text-sm text-foreground/70 dark:text-zinc-300">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
            </span>
            <span className="leading-6">{children}</span>
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
    const hasCtas = Boolean(event.registration_url || event.online_url);

    const backHref = event.backLink ?? '/formacion';
    const backLabel = event.category ? `Volver a ${event.category}` : 'Volver a formación';

    return (
        <AppLayout>
            <Head title={event.titulo} />

            <div className="mx-auto max-w-7xl px-6 pt-6 pb-16 lg:px-8 lg:pt-10 lg:pb-20">
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
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/92 px-6 py-6 shadow-[0_24px_80px_rgba(175,16,26,0.05)] backdrop-blur-xl sm:px-8 sm:py-8 lg:px-10 dark:bg-zinc-950/85">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(175,16,26,0.08),transparent_46%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(175,16,26,0.14),transparent_46%)]" />

                        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_420px] lg:items-start">
                            {/* INFO */}
                            <div className="space-y-6">
                                <div className="flex flex-wrap items-center gap-2">
                                    {event.category && <EventBadge>{event.category}</EventBadge>}
                                    {event.is_online && <EventBadge variant="secondary">Online</EventBadge>}
                                    {event.isOngoing && <EventBadge variant="live">En curso</EventBadge>}
                                </div>

                                <div className="max-w-3xl space-y-4">
                                    <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl dark:text-white">
                                        {event.titulo}
                                    </h1>

                                    {event.descripcion && (
                                        <p className="max-w-2xl text-sm leading-8 text-foreground/70 sm:text-lg dark:text-zinc-300">
                                            {event.descripcion}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <MetaItem icon={Calendar}>{event.fecha}</MetaItem>

                                    {event.hora && <MetaItem icon={Clock3}>{event.hora}</MetaItem>}

                                    <MetaItem icon={MapPin}>{event.is_online ? 'Online' : event.lugar || 'Ubicación por confirmar'}</MetaItem>

                                    {event.online_url && event.is_online && <MetaItem icon={Globe}>Acceso online disponible</MetaItem>}
                                </div>
                            </div>

                            {/* IMAGE */}
                            <div className="relative overflow-hidden rounded-[1.75rem] bg-background shadow-[0_20px_50px_rgba(175,16,26,0.08)] dark:bg-zinc-950/95">
                                <img
                                    src={imageSrc}
                                    alt={event.titulo}
                                    className="h-[280px] w-full object-cover sm:h-[340px] lg:h-[420px]"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = '/images/evento-placeholder.jpg';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-black/0 to-transparent" />
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
                                <div className="rounded-[1.75rem] bg-background p-6 shadow-[0_16px_40px_rgba(175,16,26,0.05)] dark:bg-zinc-950/95">
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase">Acciones</h3>

                                    <div className="mt-4 flex flex-col gap-3">
                                        {event.registration_url && (
                                            <a href={event.registration_url} target="_blank">
                                                <button className="h-11 w-full rounded-xl bg-zinc-950 text-white hover:bg-primary dark:bg-white dark:text-zinc-950">
                                                    Inscribirse
                                                </button>
                                            </a>
                                        )}

                                        {event.online_url && (
                                            <a href={event.online_url} target="_blank">
                                                <button className="h-11 w-full rounded-xl bg-primary/5 text-[#005f7b] hover:bg-primary/10">
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
                                <Link href={backHref} className="flex items-center justify-center gap-2 text-sm font-medium hover:text-primary">
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

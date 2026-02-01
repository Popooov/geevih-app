import AppLayout from '@/layouts/app-layout';
import { type ShowEventPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, ExternalLink, Globe, MapPin, Ticket } from 'lucide-react';

export default function Show() {
    const { event } = usePage<ShowEventPageProps>().props;

    const imageSrc = event.imagen?.trim() ? event.imagen : '/images/evento-placeholder.jpg';
    const hasCtas = Boolean(event.registration_url || event.online_url);

    return (
        <AppLayout>
            <Head title={event.titulo} />

            <div className="mx-auto max-w-6xl p-6 lg:p-0">
                {/* Back */}
                <div className="pt-6">
                    <Link
                        href="/eventos"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                        Volver a Eventos
                    </Link>
                </div>

                {/* HERO (simple) */}
                <header className="mt-4 overflow-hidden rounded-2xl border border-border/70 bg-background shadow-xl animate-in fade-in slide-in-from-bottom-6 motion-reduce:transform-none motion-reduce:animate-none">
                    <div className="relative">
                        <img
                            src={imageSrc}
                            alt={`Imagen de ${event.titulo}`}
                            className="h-[260px] w-full object-cover sm:h-[340px]"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = '/images/evento-placeholder.jpg';
                            }}
                        />

                        {/* Badges (mínimos) */}
                        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                            {event.is_online && (
                                <span className="inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                                    <Globe className="h-3.5 w-3.5 text-primary" />
                                    Online
                                </span>
                            )}

                            {event.registration_url && (
                                <span className="inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                                    <Ticket className="h-3.5 w-3.5 text-primary" />
                                    Inscripción
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4 p-6 sm:p-10">
                        <h1 className="text-4xl leading-tight font-extrabold text-foreground sm:text-5xl">{event.titulo}</h1>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-muted-foreground">
                            <span className="inline-flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                {event.fecha}
                            </span>

                            {event.hora && (
                                <span className="inline-flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    {event.hora}
                                </span>
                            )}

                            <span className="inline-flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                {event.is_online ? 'Online' : event.lugar || '—'}
                            </span>
                        </div>

                        {event.descripcion && (
                            <p className="max-w-4xl border-l-4 border-primary/50 pl-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                                {event.descripcion}
                            </p>
                        )}
                    </div>
                </header>

                {/* MAIN */}
                <main className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Content */}
                    <section className="lg:col-span-8">
                        <div className="rounded-2xl border border-border/70 bg-background shadow-lg animate-in fade-in slide-in-from-bottom-6 motion-reduce:transform-none motion-reduce:animate-none">
                            <div className="p-6 sm:p-10">
                                <h2 className="text-2xl font-bold text-foreground">Detalles del evento</h2>
                                <p className="mt-1 text-sm text-muted-foreground">Información completa y recursos relacionados.</p>

                                <div className="mt-6">
                                    {event.contenido ? (
                                        <div className="prose prose-slate dark:prose-invert max-w-none">
                                            <div dangerouslySetInnerHTML={{ __html: event.contenido }} />
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground">No hay contenido adicional para este evento.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="space-y-6 lg:sticky lg:top-6">
                            {/* CTAs */}
                            {hasCtas && (
                                <div className="rounded-2xl border border-border/70 bg-background shadow-lg">
                                    <div className="p-6">
                                        <h3 className="text-base font-bold text-foreground">Acciones</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">Acceso rápido a enlaces del evento.</p>

                                        <div className="mt-4 flex flex-col gap-3">
                                            {event.registration_url && (
                                                <a
                                                    href={event.registration_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-md transition hover:bg-primary/90 hover:shadow-lg"
                                                >
                                                    <Ticket className="h-4 w-4" />
                                                    Inscribirse
                                                    <ExternalLink className="h-4 w-4 opacity-90" />
                                                </a>
                                            )}

                                            {event.online_url && (
                                                <a
                                                    href={event.online_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-background px-4 py-3 text-sm font-bold text-foreground transition hover:border-primary/50 hover:text-primary"
                                                >
                                                    <Globe className="h-4 w-4" />
                                                    Acceder online
                                                    <ExternalLink className="h-4 w-4 opacity-80" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Info */}
                            <div className="rounded-2xl border border-border/70 bg-background shadow-lg">
                                <div className="p-6">
                                    <h3 className="text-base font-bold text-foreground">Ficha</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">Datos principales del evento.</p>

                                    <div className="mt-5 space-y-4">
                                        <InfoRow icon={<Calendar className="h-5 w-5 text-primary" />} label="Fecha" value={event.fecha} />

                                        {event.hora ? (
                                            <InfoRow icon={<Clock className="h-5 w-5 text-primary" />} label="Hora" value={event.hora} />
                                        ) : null}

                                        <InfoRow
                                            icon={<MapPin className="h-5 w-5 text-primary" />}
                                            label="Lugar"
                                            value={event.is_online ? 'Online' : event.lugar || '—'}
                                        />

                                        {event.fin ? (
                                            <InfoRow icon={<Calendar className="h-5 w-5 text-primary" />} label="Fin" value={event.fin} />
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            {/* Back to list */}
                            <div className="rounded-2xl border border-border/70 bg-background shadow-lg">
                                <div className="p-6">
                                    <Link
                                        href="/eventos"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border/70 bg-background px-4 py-3 text-sm font-bold text-foreground transition hover:border-primary/50 hover:text-primary"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Ver todos los eventos
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </aside>
                </main>

                <div className="h-10" />
            </div>
        </AppLayout>
    );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5">{icon}</div>
            <div className="min-w-0">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{label}</p>
                <p className="mt-0.5 font-semibold break-words text-foreground">{value}</p>
            </div>
        </div>
    );
}

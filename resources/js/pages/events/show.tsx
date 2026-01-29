import AppLayout from '@/layouts/app-layout';
import { type ShowEventPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, ExternalLink, Globe, MapPin, Ticket } from 'lucide-react';

export default function Show() {
    const { event } = usePage<ShowEventPageProps>().props;

    const imageSrc = event.imagen?.trim() ? event.imagen : '/images/evento-placeholder.jpg';

    // Acento VIH (sutil, pro)
    const vihGradient = 'bg-[linear-gradient(90deg,rgba(239,68,68,0.95),rgba(34,211,238,0.95),rgba(168,85,247,0.95))]';

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

                {/* HERO */}
                <header className="mt-4 overflow-hidden rounded-2xl border border-border/70 bg-background shadow-xl animate-in fade-in slide-in-from-bottom-6 motion-reduce:transform-none motion-reduce:animate-none">
                    {/* top accent */}
                    <div className={`h-1 w-full ${vihGradient}`} />

                    <div className="relative">
                        {/* Background image */}
                        <div className="relative h-[320px] w-full sm:h-[380px]">
                            <img
                                src={imageSrc}
                                alt={`Imagen de ${event.titulo}`}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = '/images/evento-placeholder.jpg';
                                }}
                            />
                            {/* overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_45%)]" />
                        </div>

                        {/* Hero content */}
                        <div className="absolute inset-0 flex items-end">
                            <div className="w-full p-6 sm:p-10">
                                {/* chips row */}
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                    {event.is_online && (
                                        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                                            <Globe className="h-3.5 w-3.5" />
                                            Online
                                        </span>
                                    )}
                                    {event.registration_url && (
                                        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                                            <Ticket className="h-3.5 w-3.5" />
                                            Inscripción abierta
                                        </span>
                                    )}
                                </div>

                                <h1 className="max-w-4xl text-4xl leading-tight font-extrabold text-white sm:text-5xl">{event.titulo}</h1>

                                {/* accent underline */}
                                <div className="mt-4 flex items-center gap-3">
                                    <div className={`h-1.5 w-24 rounded-full ${vihGradient}`} />
                                    <p className="text-sm font-semibold text-white/85">
                                        {event.fecha}
                                        {event.hora ? ` · ${event.hora}` : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Short intro strip */}
                    {event.descripcion && (
                        <div className="border-t border-border/70 bg-background/60 p-6 sm:p-8">
                            <p className="max-w-4xl text-base leading-relaxed text-muted-foreground sm:text-lg">{event.descripcion}</p>
                        </div>
                    )}
                </header>

                {/* MAIN LAYOUT */}
                <main className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* CONTENT */}
                    <section className="lg:col-span-8">
                        <div className="rounded-2xl border border-border/70 bg-background shadow-lg animate-in fade-in slide-in-from-bottom-6 motion-reduce:transform-none motion-reduce:animate-none">
                            <div className="p-6 sm:p-10">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className={`h-10 w-1.5 rounded-full ${vihGradient}`} />
                                    <div>
                                        <h2 className="text-2xl font-bold text-foreground">Detalles</h2>
                                        <p className="text-sm text-muted-foreground">Información completa del evento</p>
                                    </div>
                                </div>

                                {event.contenido ? (
                                    <div className="prose prose-slate dark:prose-invert max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: event.contenido }} />
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">No hay contenido adicional para este evento.</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* SIDEBAR */}
                    <aside className="lg:col-span-4">
                        <div className="space-y-6 lg:sticky lg:top-6">
                            {/* CTAs */}
                            {hasCtas && (
                                <div className="rounded-2xl border border-border/70 bg-background shadow-lg">
                                    <div className="p-6">
                                        <h3 className="text-base font-bold text-foreground">Acciones</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">Accede rápidamente a inscripción o sesión online.</p>

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
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/60 bg-background px-4 py-3 text-sm font-bold text-primary transition hover:bg-primary/10"
                                                >
                                                    <Globe className="h-4 w-4" />
                                                    Acceder online
                                                    <ExternalLink className="h-4 w-4 opacity-80" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`h-1 w-full ${vihGradient}`} />
                                </div>
                            )}

                            {/* INFO CARD */}
                            <div className="rounded-2xl border border-border/70 bg-background shadow-lg">
                                <div className="p-6">
                                    <h3 className="text-base font-bold text-foreground">Ficha del evento</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">Datos principales</p>

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

                                {/* soft divider */}
                                <div className="border-t border-border/70" />

                                <div className="p-6">
                                    <div className="rounded-xl bg-muted/40 p-4">
                                        <p className="text-sm font-semibold text-foreground">Tip</p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Puedes compartir este evento copiando la URL desde tu navegador.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* EXTRA: back to list */}
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

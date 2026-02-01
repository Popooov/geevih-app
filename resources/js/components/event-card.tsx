import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, Clock, Globe, MapPin, Ticket } from 'lucide-react';

interface EventCardProps {
    titulo: string;
    fecha: string;
    hora?: string | null;
    descripcion?: string | null;
    enlace?: string | null;
    imagen?: string | null;
    lugar?: string | null;

    is_online?: boolean;
    registration_url?: string | null;
    online_url?: string | null;

    // Puede venir desde backend o setearse en frontend (para pasados en pastEvents)
    isPast?: boolean;
    isOngoing?: boolean;

    // Futuro
    materials_url?: string | null;
}

export default function EventCard({
    titulo,
    fecha,
    hora,
    descripcion,
    lugar,
    enlace,
    imagen,
    is_online,
    registration_url,
    online_url,
    isPast = false,
    isOngoing = false,
    materials_url,
}: EventCardProps) {
    const imageSrc = imagen?.trim() ? imagen : '/images/evento-placeholder.jpg';

    // Prioridad de click:
    // 1) Detalle interno
    // 2) Registro
    // 3) Online
    // 4) '#'
    const href = enlace?.trim() ? enlace : registration_url?.trim() ? registration_url : online_url?.trim() ? online_url : '#';

    const isExternal = Boolean((registration_url || online_url) && !enlace);

    // Hover “rojo VIH”
    const hoverLift = isPast ? '' : 'hover:-translate-y-1';
    const hoverBorder = isPast ? 'hover:border-border/80' : 'hover:border-red-600/50 dark:hover:border-red-400/40';
    const hoverShadow = isPast ? 'hover:shadow-lg' : 'hover:shadow-2xl hover:shadow-red-500/10';

    // Accent base + hover rojo
    const metaAccent = isPast ? 'text-muted-foreground' : 'text-primary group-hover:text-red-600 dark:group-hover:text-red-400';

    const headerHeight = 'h-52';
    const titleSize = 'text-xl';

    const openExternal = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <Link
            href={href}
            className={['group flex h-full flex-col rounded-xl transition-all duration-300', hoverLift, hoverShadow].join(' ')}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
            <Card
                className={[
                    'relative flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-background shadow-sm transition-all duration-300',
                    hoverBorder,
                    'animate-in fade-in slide-in-from-bottom-8 motion-reduce:transform-none motion-reduce:animate-none',
                ].join(' ')}
            >
                {/* Barra superior: base primary, hover rojo */}
                <div
                    className={[
                        'h-1 w-full transition-colors duration-300',
                        isPast ? 'bg-border' : 'bg-primary group-hover:bg-red-600 dark:group-hover:bg-red-400',
                    ].join(' ')}
                />

                <CardHeader className={`relative ${headerHeight} p-0`}>
                    <img
                        src={imageSrc}
                        alt={`Imagen del evento: ${titulo}`}
                        className={[
                            'h-full w-full object-cover transition-transform duration-500',
                            isPast ? 'grayscale' : 'group-hover:scale-[1.04]',
                        ].join(' ')}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/evento-placeholder.jpg';
                        }}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                        {isPast && <span className="rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white shadow-sm">Finalizado</span>}

                        {!isPast && isOngoing && (
                            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm transition-colors duration-300 group-hover:bg-red-600 dark:group-hover:bg-red-400">
                                En curso
                            </span>
                        )}

                        {!isPast && is_online && (
                            <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm dark:bg-slate-900/80 dark:text-slate-100">
                                <span className="inline-flex items-center gap-1">
                                    <Globe className="h-3.5 w-3.5" />
                                    Online
                                </span>
                            </span>
                        )}

                        {!isPast && registration_url && (
                            <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm dark:bg-slate-900/80 dark:text-slate-100">
                                <span className="inline-flex items-center gap-1">
                                    <Ticket className="h-3.5 w-3.5" />
                                    Inscripción
                                </span>
                            </span>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="flex-grow space-y-4 p-6">
                    {/* Meta */}
                    <div className="space-y-2 text-sm">
                        <div className={['flex flex-wrap items-center gap-x-3 gap-y-1 transition-colors duration-300', metaAccent].join(' ')}>
                            <span className="inline-flex items-center gap-2 font-semibold">
                                <Calendar className="h-4 w-4" />
                                {fecha}
                            </span>

                            {hora && (
                                <span className="inline-flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    {hora}
                                </span>
                            )}
                        </div>

                        {!!lugar && (
                            <div className="flex items-start gap-2 text-muted-foreground">
                                <MapPin
                                    className={[
                                        'mt-0.5 h-4 w-4 shrink-0 transition-colors duration-300',
                                        isPast ? 'text-muted-foreground' : 'text-primary group-hover:text-red-600 dark:group-hover:text-red-400',
                                    ].join(' ')}
                                />
                                <span className="line-clamp-2">{lugar}</span>
                            </div>
                        )}
                    </div>

                    <CardTitle
                        className={[
                            titleSize,
                            'leading-snug font-bold text-foreground transition-colors duration-300',
                            isPast ? '' : 'group-hover:text-red-600 dark:group-hover:text-red-400',
                        ].join(' ')}
                    >
                        {titulo}
                    </CardTitle>

                    {descripcion && <CardDescription className="line-clamp-3 leading-relaxed">{descripcion}</CardDescription>}
                </CardContent>

                <CardFooter className="flex items-center justify-between gap-3 px-6 pb-6">
                    {/* CTA principal */}
                    {materials_url && isPast ? (
                        <span
                            className={['inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300', metaAccent].join(' ')}
                        >
                            Ver materiales
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                    ) : enlace ? (
                        <span
                            className={[
                                'inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300',
                                metaAccent,
                                !isPast ? 'group-hover:gap-3' : '',
                            ].join(' ')}
                        >
                            Ver detalles
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                    ) : registration_url ? (
                        <span
                            className={['inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300', metaAccent].join(' ')}
                        >
                            <Ticket className="h-4 w-4" />
                            Inscribirse
                            <ArrowRight className="h-4 w-4" />
                        </span>
                    ) : online_url ? (
                        <span
                            className={['inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300', metaAccent].join(' ')}
                        >
                            <Globe className="h-4 w-4" />
                            Acceder online
                            <ArrowRight className="h-4 w-4" />
                        </span>
                    ) : (
                        <span className="text-sm font-semibold text-muted-foreground">Sin enlace</span>
                    )}

                    {/* Acciones rápidas (solo si hay detalle interno) */}
                    {enlace && !isPast ? (
                        <div className="flex items-center gap-2">
                            {registration_url && (
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-semibold text-foreground/90 transition hover:border-red-600/50 hover:text-red-600 dark:hover:border-red-400/40 dark:hover:text-red-400"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        openExternal(registration_url);
                                    }}
                                >
                                    <Ticket className="h-3.5 w-3.5" />
                                    Inscripción
                                </button>
                            )}

                            {online_url && (
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-semibold text-foreground/90 transition hover:border-red-600/50 hover:text-red-600 dark:hover:border-red-400/40 dark:hover:text-red-400"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        openExternal(online_url);
                                    }}
                                >
                                    <Globe className="h-3.5 w-3.5" />
                                    Online
                                </button>
                            )}
                        </div>
                    ) : null}
                </CardFooter>
            </Card>
        </Link>
    );
}

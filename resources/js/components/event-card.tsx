import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, Clock, Globe, MapPin, Ticket } from 'lucide-react';

interface EventCardProps {
    titulo: string;
    fecha: string; // ya formateada desde backend (recomendado)
    hora?: string | null;
    descripcion?: string | null;
    enlace?: string | null;
    imagen?: string | null;
    lugar: string;

    // nuevos (opcionales)
    is_online?: boolean;
    registration_url?: string | null;
    online_url?: string | null;

    isPast?: boolean;
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
}: EventCardProps) {
    const primaryColor = isPast ? 'text-gray-500' : 'text-amber-600 dark:text-amber-400';
    const hoverStyles = isPast
        ? 'hover:shadow-lg hover:border-gray-300 opacity-70'
        : 'hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1';

    const imageSrc = imagen?.trim() ? imagen : '/images/evento-placeholder.jpg';

    // Si quieres que la card vaya al detalle, usa enlace.
    // Si no hay detalle, pero sí hay registro/online, la card puede ir a esos links.
    const href = enlace?.trim() ? enlace : registration_url?.trim() ? registration_url : online_url?.trim() ? online_url : '#';

    const isExternal = Boolean(registration_url || online_url) && !enlace;

    return (
        <Link
            href={href}
            className={`group flex h-full flex-col rounded-xl transition-all duration-300 ${hoverStyles}`}
            // Si es link externo (registro/online), es mejor abrir en otra pestaña
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
            <Card className="flex h-full flex-col overflow-hidden">
                <CardHeader className="relative h-48 p-0">
                    <img
                        src={imageSrc}
                        alt={`Imagen del evento: ${titulo}`}
                        className={`h-full w-full rounded-t-xl object-cover transition-transform duration-500 ${
                            isPast ? 'grayscale' : 'group-hover:scale-[1.05]'
                        }`}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/evento-placeholder.jpg';
                        }}
                    />

                    {isPast && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <span className="rounded-lg bg-black/60 p-2 text-xl font-bold text-white">FINALIZADO</span>
                        </div>
                    )}
                </CardHeader>

                <CardContent className="flex-grow space-y-3 p-6">
                    <div className="space-y-1 text-sm font-medium">
                        <div className={`flex items-center gap-2 ${primaryColor}`}>
                            <Calendar className="h-4 w-4 shrink-0" />
                            <span>{fecha}</span>
                            {hora && (
                                <span className="ml-2 flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {hora}
                                </span>
                            )}
                        </div>

                        {lugar && (
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <MapPin className={`h-4 w-4 shrink-0 ${primaryColor}`} />
                                <span>{lugar}</span>
                                {is_online && (
                                    <span className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-gray-400">
                                        <Globe className="h-3.5 w-3.5" />
                                        Online
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <CardTitle className={`pt-1 text-2xl leading-tight font-bold text-gray-900 transition-colors dark:text-white`}>
                        {titulo}
                    </CardTitle>

                    {descripcion && <CardDescription className="line-clamp-3">{descripcion}</CardDescription>}
                </CardContent>

                <CardFooter className="px-6 pb-5">
                    {enlace ? (
                        <span className={`inline-flex items-center gap-1 text-sm font-semibold transition-all ${primaryColor} hover:gap-2`}>
                            Más información
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                    ) : registration_url ? (
                        <span className={`inline-flex items-center gap-2 text-sm font-semibold transition-all ${primaryColor}`}>
                            <Ticket className="h-4 w-4" />
                            Inscribirse
                            <ArrowRight className="h-4 w-4" />
                        </span>
                    ) : online_url ? (
                        <span className={`inline-flex items-center gap-2 text-sm font-semibold transition-all ${primaryColor}`}>
                            <Globe className="h-4 w-4" />
                            Acceder online
                            <ArrowRight className="h-4 w-4" />
                        </span>
                    ) : null}
                </CardFooter>
            </Card>
        </Link>
    );
}

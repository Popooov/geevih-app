import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

interface EventCardProps {
    titulo: string;
    fecha: string;
    descripcion: string;
    enlace?: string;
    imagen?: string;
    lugar: string;
    isPast?: boolean;
}

export default function EventCard({ titulo, fecha, descripcion, lugar, enlace, imagen, isPast = false }: EventCardProps) {
    // Helper to format date nicely
    const formattedDate = new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Define primary color for accents
    const primaryColor = isPast ? 'text-gray-500' : 'text-amber-600 dark:text-amber-400';
    const hoverStyles = isPast
        ? 'hover:shadow-lg hover:border-gray-300 opacity-70'
        : 'hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1';

    return (
        // Link wrapper with enhanced hover effect
        <Link
            href={enlace ?? '#'}
            className={`group flex h-full flex-col rounded-xl transition-all duration-300 ${hoverStyles}`}
        >
            <Card className="flex h-full flex-col overflow-hidden">
                {/* HEADER: Image Section */}
                <CardHeader className="relative h-48">
                    <img
                        src={imagen ?? 'images/evento-placeholder.jpg'}
                        alt={`Imagen del evento: ${titulo}`}
                        // Add smooth scale transition on image hover
                        className="h-full w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    {isPast && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <span className="rounded-lg bg-black/60 p-2 text-xl font-bold text-white">FINALIZADO</span>
                        </div>
                    )}
                </CardHeader>

                {/* CONTENT: Metadata (Date/Location), Title, and Description */}
                <CardContent className="flex-grow space-y-3">
                    {/* Metadata Block (Date and Location) - Styled with Primary Color */}
                    <div className="space-y-1 text-sm font-medium">
                        <div className={`flex items-center gap-2 ${primaryColor}`}>
                            <Calendar className="h-4 w-4 shrink-0" />
                            <time dateTime={fecha}>{formattedDate}</time>
                        </div>
                        {lugar && (
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <MapPin className={`h-4 w-4 shrink-0 ${primaryColor}`} />
                                <span>{lugar}</span>
                            </div>
                        )}
                    </div>

                    {/* Title - Larger and more prominent, outside the image */}
                    <CardTitle
                        className={`pt-1 text-2xl leading-tight font-bold text-gray-900 transition-colors dark:text-white group-hover:${primaryColor}`}
                    >
                        {titulo}
                    </CardTitle>

                    {/* Description - Clamped to 3 lines for clean grid display */}
                    <CardDescription className="line-clamp-3">{descripcion}</CardDescription>
                </CardContent>

                {/* FOOTER: Link */}
                {enlace && (
                    <CardFooter className="pb-5">
                        <span className={`inline-flex items-center gap-1 text-sm font-semibold transition-all ${primaryColor} hover:gap-2`}>
                            Más información
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                    </CardFooter>
                )}
            </Card>
        </Link>
    );
}

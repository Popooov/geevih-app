import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, MapPin, Clock } from 'lucide-react';

interface EventCardProps {
    titulo: string;
    fecha: string;
    hora?: string;
    descripcion: string;
    enlace?: string;
    imagen?: string;
    lugar: string;
    isPast?: boolean;
}

export default function EventCard ({ titulo, fecha, hora, descripcion, lugar, enlace, imagen, isPast = false }: EventCardProps)  {
    // Helper to format date nicely
    const formattedDate = new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    console.log(imagen);

    const primaryColor = isPast ? 'text-gray-500' : 'text-amber-600 dark:text-amber-400';
    const hoverStyles = isPast
        ? 'hover:shadow-lg hover:border-gray-300 opacity-70'
        : 'hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1';

    return (
        // Link wrapper with enhanced hover effect
        <Link
            href={enlace ?? '#'}
            className={`group h-full flex flex-col rounded-xl transition-all duration-300 ${hoverStyles}`}
        >
            <Card className="flex flex-col h-full overflow-hidden">

                {/* HEADER: Image Section */}
                <CardHeader className="relative h-48">
                    <img
                        src={imagen ?? 'images/evento-placeholder.jpg'}
                        alt={`Imagen del evento: ${titulo}`}
                        className={`h-full w-full object-cover transition-transform duration-500 ${isPast ? 'grayscale' : 'group-hover:scale-[1.05]'} rounded-t-xl`}
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='images/evento-placeholder.jpg'; }}
                    />
                     {isPast && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-white text-xl font-bold p-2 bg-black/60 rounded-lg">FINALIZADO</span>
                        </div>
                    )}
                </CardHeader>

                {/* CONTENT: Metadata (Date/Location), Title, and Description */}
                <CardContent className="flex-grow space-y-3">

                    {/* Metadata Block (Date, Time and Location) - Styled with Primary Color */}
                    <div className="space-y-1 text-sm font-medium">
                        {/* Date and Time block - UPDATED to include hora */}
                        <div className={`flex items-center gap-2 ${primaryColor}`}>
                            <Calendar className="h-4 w-4 shrink-0" />
                            <time dateTime={fecha}>{formattedDate}</time>
                            {hora && (
                                <span className="flex items-center gap-1 ml-2">
                                    <Clock className="h-4 w-4" />
                                    {hora}
                                </span>
                            )}
                        </div>

                        {/* Location block */}
                        {lugar && (
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <MapPin className={`h-4 w-4 shrink-0 ${primaryColor}`} />
                                <span>{lugar}</span>
                            </div>
                        )}
                    </div>

                    {/* Title - Larger and more prominent, font-bold for consistency */}
                    <CardTitle className={`text-2xl font-bold leading-tight pt-1 transition-colors text-gray-900 dark:text-white group-hover:${primaryColor}`}>
                        {titulo}
                    </CardTitle>

                    {/* Description - Clamped to 3 lines for clean grid display */}
                    <CardDescription className="line-clamp-3">
                        {descripcion}
                    </CardDescription>
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
};

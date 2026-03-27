import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar, Clock, ExternalLink, MapPin } from 'lucide-react';

interface EventCardProps {
    titulo: string;
    fecha: string;
    hora?: string | null;
    descripcion?: string | null;
    imagen?: string | null;
    enlace?: string | null;
    lugar?: string;
    is_online?: boolean;
    registration_url?: string | null;
    online_url?: string | null;
    isOngoing?: boolean;
    isPast?: boolean;
}

export default function EventCard({
    titulo,
    fecha,
    hora,
    descripcion,
    imagen,
    enlace,
    lugar,
    is_online,
    registration_url,
    online_url,
    isOngoing,
    isPast,
}: EventCardProps) {
    const imageSrc = imagen ?? '/images/event-placeholder.jpg';

    return (
        <Card className="group overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* IMAGE */}
            <div className="relative">
                <img src={imageSrc} alt={titulo} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    {is_online && <Badge variant="secondary">Online</Badge>}
                    {isOngoing && <Badge className="bg-green-600 text-white">En curso</Badge>}
                    {isPast && <Badge variant="outline">Finalizado</Badge>}
                </div>
            </div>

            {/* CONTENT */}
            <CardContent className="space-y-4 p-5">
                {/* Title */}
                <h3 className="line-clamp-2 text-lg font-semibold text-foreground">{titulo}</h3>

                {/* Meta info */}
                <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {fecha}
                    </div>

                    {hora && (
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {hora}
                        </div>
                    )}

                    {lugar && (
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {lugar}
                        </div>
                    )}
                </div>

                {/* Description */}
                {descripcion && <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{descripcion}</p>}
            </CardContent>

            {/* FOOTER */}
            <CardFooter className="flex flex-col gap-2 p-5 pt-0">
                {registration_url && (
                    <a href={registration_url} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button className="w-full">Inscribirse</Button>
                    </a>
                )}

                {!registration_url && enlace && (
                    <a href={enlace} className="w-full">
                        <Button variant="secondary" className="w-full">
                            Ver evento <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                )}

                {online_url && (
                    <a href={online_url} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button variant="outline" className="w-full">
                            Acceder online
                        </Button>
                    </a>
                )}
            </CardFooter>
        </Card>
    );
}

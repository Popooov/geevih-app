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
        <Card
            className={[
                'group overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-300',
                isPast ? 'border-border/60 opacity-90 grayscale-[0.15] hover:shadow-md' : 'border-border/70 hover:-translate-y-1 hover:shadow-xl',
            ].join(' ')}
        >
            <div className="relative">
                <img
                    src={imageSrc}
                    alt={titulo}
                    className={['h-52 w-full object-cover transition duration-500', isPast ? 'brightness-[0.92]' : 'group-hover:scale-105'].join(' ')}
                />

                {isPast && <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />}

                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {is_online && <Badge className="border-0 bg-sky-600 text-white dark:bg-sky-500">Online</Badge>}

                    {isOngoing && <Badge className="border-0 bg-green-600 text-white dark:bg-green-500">En curso</Badge>}

                    {isPast && <Badge className="border-0 bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-900">Finalizado</Badge>}
                </div>
            </div>

            <CardContent className="space-y-4 p-5">
                <h3 className={['line-clamp-2 text-lg font-semibold', isPast ? 'text-foreground/85' : 'text-foreground'].join(' ')}>{titulo}</h3>

                <div className={['space-y-1 text-sm', isPast ? 'text-muted-foreground/90' : 'text-muted-foreground'].join(' ')}>
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

                {descripcion && (
                    <p className={['line-clamp-3 text-sm leading-relaxed', isPast ? 'text-muted-foreground/90' : 'text-muted-foreground'].join(' ')}>
                        {descripcion}
                    </p>
                )}
            </CardContent>

            <CardFooter className="flex flex-col gap-2 p-5 pt-0">
                {!isPast && registration_url && (
                    <a href={registration_url} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button className="w-full cursor-pointer">Inscribirse</Button>
                    </a>
                )}

                {enlace && (
                    <a href={enlace} className="w-full">
                        <Button variant={isPast ? 'outline' : 'secondary'} className="w-full cursor-pointer">
                            {isPast ? 'Ver detalles' : 'Ver evento'}
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                )}

                {!isPast && online_url && (
                    <a href={online_url} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button variant="outline" className="w-full cursor-pointer">
                            Acceder online
                        </Button>
                    </a>
                )}
            </CardFooter>
        </Card>
    );
}

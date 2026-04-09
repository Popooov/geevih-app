import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
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
            className={cn(
                'group overflow-hidden rounded-2xl border bg-background transition-all duration-300',
                isPast ? 'border-border/50 bg-muted/20 opacity-85 shadow-sm' : 'border-border/70 shadow-sm hover:-translate-y-1 hover:shadow-xl',
            )}
        >
            <div className="relative overflow-hidden">
                <img
                    src={imageSrc}
                    alt={titulo}
                    className={cn(
                        'h-52 w-full object-cover transition duration-500',
                        isPast ? 'brightness-[0.88] grayscale-[0.65]' : 'group-hover:scale-105',
                    )}
                />

                {isPast && <div className="absolute inset-0 bg-white/10 dark:bg-black/20" />}

                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {is_online && !isPast && <Badge className="border-0 bg-sky-600 text-white shadow-sm dark:bg-sky-500">Online</Badge>}

                    {isOngoing && !isPast && <Badge className="border-0 bg-green-600 text-white shadow-sm dark:bg-green-500">En curso</Badge>}

                    {isPast && <Badge className="border-0 bg-zinc-800 text-white shadow-sm dark:bg-zinc-200 dark:text-zinc-900">Finalizado</Badge>}
                </div>

                {!isPast && <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-400" />}
            </div>

            <CardContent className="space-y-4 p-5">
                <h3 className={cn('line-clamp-2 text-lg font-semibold', isPast ? 'text-foreground/75' : 'text-foreground')}>{titulo}</h3>

                <div className={cn('space-y-1 text-sm', isPast ? 'text-muted-foreground/75' : 'text-muted-foreground')}>
                    <div className="flex items-center gap-2">
                        <Calendar className={cn('h-4 w-4', !isPast && 'text-red-500')} />
                        {fecha}
                    </div>

                    {hora && (
                        <div className="flex items-center gap-2">
                            <Clock className={cn('h-4 w-4', !isPast && 'text-red-500')} />
                            {hora}
                        </div>
                    )}

                    {lugar && (
                        <div className="flex items-center gap-2">
                            <MapPin className={cn('h-4 w-4', !isPast && 'text-red-500')} />
                            {lugar}
                        </div>
                    )}
                </div>

                {descripcion && (
                    <p className={cn('line-clamp-3 text-sm leading-relaxed', isPast ? 'text-muted-foreground/75' : 'text-muted-foreground')}>
                        {descripcion}
                    </p>
                )}
            </CardContent>

            <CardFooter className="flex flex-col gap-2 p-5 pt-0">
                {!isPast && registration_url && (
                    <a href={registration_url} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button className="w-full cursor-pointer bg-zinc-950 text-white hover:bg-red-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-red-500">
                            Inscribirse
                        </Button>
                    </a>
                )}

                {enlace && (
                    <a href={enlace} className="w-full">
                        <Button
                            variant={isPast ? 'outline' : 'secondary'}
                            className={cn('w-full cursor-pointer', !isPast && 'hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-950/20')}
                        >
                            {isPast ? 'Ver detalles' : 'Ver evento'}
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                )}

                {!isPast && online_url && (
                    <a href={online_url} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button variant="outline" className="w-full cursor-pointer hover:border-red-300">
                            Acceder online
                        </Button>
                    </a>
                )}
            </CardFooter>
        </Card>
    );
}

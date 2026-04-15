import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar, Clock3, ExternalLink, MapPin } from 'lucide-react';

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

function EventBadge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'secondary' | 'live' | 'finished' }) {
    const styles = {
        default: 'bg-primary/10 text-primary',
        secondary: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
        live: 'bg-emerald-600 text-white dark:bg-emerald-500',
        finished: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900',
    };

    return (
        <Badge className={cn('rounded-full border-0 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase', styles[variant])}>
            {children}
        </Badge>
    );
}

function MetaItem({ icon: Icon, children, muted }: { icon: React.ElementType; children: React.ReactNode; muted?: boolean }) {
    return (
        <div
            className={cn(
                'flex items-center gap-3 text-sm',
                muted ? 'text-foreground/60 dark:text-zinc-400' : 'text-foreground/70 dark:text-zinc-300',
            )}
        >
            <span
                className={cn(
                    'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                    muted ? 'bg-muted text-muted-foreground dark:bg-zinc-800 dark:text-zinc-400' : 'bg-primary/10 text-primary',
                )}
            >
                <Icon className="h-4 w-4" />
            </span>

            <span className="leading-6">{children}</span>
        </div>
    );
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
    const showPhysicalLocation = !!lugar && !is_online;

    return (
        <article
            className={cn(
                'group h-full overflow-hidden rounded-[2rem] transition-all duration-300',
                isPast
                    ? 'bg-background/95 shadow-[0_12px_30px_rgba(0,0,0,0.03)] dark:bg-zinc-950/92'
                    : isOngoing
                      ? 'bg-primary/5 shadow-[0_20px_50px_rgba(175,16,26,0.08)] dark:bg-primary/10'
                      : 'bg-background shadow-[0_16px_40px_rgba(175,16,26,0.05)] hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(175,16,26,0.10)] dark:bg-zinc-950/95',
            )}
        >
            <div className="grid h-full md:min-h-[360px] md:grid-cols-[0.9fr_1fr]">
                <div className="relative min-h-[220px] overflow-hidden md:min-h-full">
                    <img
                        src={imageSrc}
                        alt={titulo}
                        className={cn(
                            'h-full w-full object-cover transition duration-700',
                            isPast ? 'brightness-[0.88] grayscale-[0.65]' : 'group-hover:scale-[1.02]',
                        )}
                    />

                    <div
                        className={cn(
                            'absolute inset-0',
                            isPast
                                ? 'bg-gradient-to-t from-black/20 via-black/5 to-transparent'
                                : 'bg-gradient-to-t from-black/18 via-black/0 to-transparent',
                        )}
                    />

                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {is_online && !isPast && <EventBadge variant="secondary">Online</EventBadge>}
                        {isOngoing && !isPast && <EventBadge variant="live">En curso</EventBadge>}
                        {isPast && <EventBadge variant="finished">Finalizado</EventBadge>}
                    </div>
                </div>

                <div className="flex h-full flex-col p-6 sm:p-7">
                    <div className="flex min-h-0 flex-1 flex-col">
                        <div className="space-y-3">
                            <h3
                                className={cn(
                                    'text-2xl font-semibold tracking-tight',
                                    isPast ? 'text-foreground/85 dark:text-zinc-100' : 'text-foreground dark:text-white',
                                )}
                            >
                                {titulo}
                            </h3>

                            {descripcion && (
                                <p
                                    className={cn(
                                        'line-clamp-2 text-sm leading-7',
                                        isPast ? 'text-foreground/60 dark:text-zinc-400' : 'text-foreground/65 dark:text-zinc-300',
                                    )}
                                >
                                    {descripcion}
                                </p>
                            )}
                        </div>

                        <div className="mt-6 grid gap-3">
                            <MetaItem icon={Calendar} muted={isPast}>
                                {fecha}
                            </MetaItem>

                            {hora && (
                                <MetaItem icon={Clock3} muted={isPast}>
                                    {hora}
                                </MetaItem>
                            )}

                            {showPhysicalLocation && (
                                <MetaItem icon={MapPin} muted={isPast}>
                                    {lugar}
                                </MetaItem>
                            )}
                        </div>

                        <div className="mt-auto pt-7">
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                {!isPast && registration_url && (
                                    <a href={registration_url} target="_blank" rel="noopener noreferrer">
                                        <Button className="h-11 cursor-pointer rounded-xl bg-zinc-950 px-5 text-white hover:bg-primary dark:bg-white dark:text-zinc-950 dark:hover:bg-primary dark:hover:text-white">
                                            Inscribirse
                                        </Button>
                                    </a>
                                )}

                                {enlace && (
                                    <a href={enlace} target="_self" rel="noopener noreferrer">
                                        <Button
                                            variant="outline"
                                            className="h-11 cursor-pointer rounded-xl border-border/60 bg-background px-5 hover:border-primary/30 hover:bg-primary/5 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                                        >
                                            {isPast ? 'Ver detalles' : 'Ver actividad'}
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </Button>
                                    </a>
                                )}

                                {!isPast && online_url && is_online && (
                                    <a href={online_url} target="_blank" rel="noopener noreferrer">
                                        <Button
                                            variant="ghost"
                                            className="h-11 cursor-pointer rounded-xl px-3 text-[#005f7b] hover:bg-[#005f7b]/10 hover:text-[#005f7b] dark:text-sky-300 dark:hover:bg-sky-500/10 dark:hover:text-sky-200"
                                        >
                                            Acceder online
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

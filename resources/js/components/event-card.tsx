import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar, Clock3, MapPin } from 'lucide-react';
import type { ReactNode } from 'react';

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
    priority?: boolean;
}

function EventBadge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'secondary' | 'live' | 'finished' }) {
    const styles = {
        default: 'bg-primary/10 text-primary dark:bg-primary/15 dark:text-red-200',
        secondary: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
        live: 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-white',
        finished: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900',
    };

    return (
        <Badge className={cn('rounded-full border-0 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase', styles[variant])}>
            {children}
        </Badge>
    );
}

function MetaItem({ icon: Icon, children, muted }: { icon: React.ElementType; children: ReactNode; muted?: boolean }) {
    return (
        <div
            className={cn(
                'flex items-center gap-2.5 text-xs sm:text-sm',
                muted ? 'text-foreground/55 dark:text-zinc-500' : 'text-foreground/70 dark:text-zinc-300',
            )}
        >
            <span
                className={cn(
                    'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8',
                    muted ? 'bg-muted text-muted-foreground dark:bg-zinc-800 dark:text-zinc-400' : 'bg-primary/10 text-primary dark:bg-primary/15',
                )}
            >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
    priority = false,
}: EventCardProps) {
    const imageSrc = imagen && imagen.trim() !== '' ? imagen : '/images/event-placeholder.png';
    const showPhysicalLocation = !!lugar && !is_online;

    return (
        <article
            className={cn(
                'group flex h-full flex-col overflow-hidden rounded-[1.75rem] transition-all duration-300',
                isPast
                    ? 'bg-muted/45 shadow-[0_12px_30px_rgba(0,0,0,0.025)] dark:bg-zinc-950/80'
                    : isOngoing
                      ? 'bg-primary/5 shadow-[0_18px_44px_rgba(175,16,26,0.07)] dark:bg-primary/10'
                      : 'bg-background shadow-[0_14px_34px_rgba(175,16,26,0.045)] hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(175,16,26,0.09)] dark:bg-zinc-950/95',
            )}
        >
            <div className="relative aspect-[16/9] overflow-hidden bg-muted dark:bg-zinc-900">
                <img
                    src={imageSrc}
                    alt={titulo}
                    width={768}
                    height={432}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    loading={priority ? 'eager' : 'lazy'}
                    fetchPriority={priority ? 'high' : 'auto'}
                    decoding="async"
                    className={cn(
                        'h-full w-full object-cover transition duration-700',
                        isPast ? 'brightness-[0.82] grayscale-[0.75]' : 'group-hover:scale-[1.02]',
                    )}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/event-placeholder.png';
                    }}
                />

                <div
                    className={cn(
                        'pointer-events-none absolute inset-x-0 bottom-0 h-20',
                        isPast
                            ? 'bg-gradient-to-t from-black/25 via-black/5 to-transparent'
                            : 'bg-gradient-to-t from-black/12 via-black/0 to-transparent',
                    )}
                />
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="space-y-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                        {is_online && !isPast && <EventBadge variant="secondary">Online</EventBadge>}
                        {isOngoing && !isPast && <EventBadge variant="live">En curso</EventBadge>}
                        {isPast && <EventBadge variant="finished">Finalizado</EventBadge>}
                    </div>

                    <h3
                        className={cn(
                            'line-clamp-3 text-lg leading-snug font-semibold tracking-tight sm:text-xl',
                            isPast ? 'text-foreground/80 dark:text-zinc-200' : 'text-foreground dark:text-white',
                        )}
                    >
                        {titulo}
                    </h3>

                    {descripcion && (
                        <p
                            className={cn(
                                'line-clamp-3 text-sm leading-6',
                                isPast ? 'text-foreground/55 dark:text-zinc-500' : 'text-foreground/65 dark:text-zinc-300',
                            )}
                        >
                            {descripcion}
                        </p>
                    )}
                </div>

                <div className="mt-5 grid gap-2.5">
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

                <div className="mt-auto pt-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {!isPast && registration_url && (
                            <a href={registration_url} target="_blank" rel="noopener noreferrer">
                                <Button className="h-10 cursor-pointer rounded-xl bg-zinc-950 px-4 text-xs font-semibold text-white hover:bg-primary sm:h-11 sm:px-5 sm:text-sm dark:bg-white dark:text-zinc-950 dark:hover:bg-primary dark:hover:text-white">
                                    Inscribirse
                                </Button>
                            </a>
                        )}

                        {enlace && (
                            <a href={enlace} target="_self" rel="noopener noreferrer">
                                <Button
                                    variant="ghost"
                                    className="h-10 cursor-pointer rounded-xl px-3 text-xs font-semibold text-foreground/75 hover:bg-primary/5 hover:text-primary sm:h-11 sm:px-4 sm:text-sm dark:text-zinc-200 dark:hover:bg-zinc-900"
                                >
                                    {isPast ? 'Ver detalles' : 'Ver actividad'}
                                </Button>
                            </a>
                        )}

                        {!isPast && online_url && is_online && (
                            <a href={online_url} target="_blank" rel="noopener noreferrer">
                                <Button
                                    variant="ghost"
                                    className="h-10 cursor-pointer rounded-xl px-3 text-xs font-semibold text-[#005f7b] hover:bg-[#005f7b]/10 hover:text-[#005f7b] sm:h-11 sm:text-sm dark:text-sky-300 dark:hover:bg-sky-500/10 dark:hover:text-sky-200"
                                >
                                    Acceder online
                                </Button>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

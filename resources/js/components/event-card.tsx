import { SiteButton } from '@/components/site-button';
import { Badge } from '@/components/ui/badge';
import { attendanceLabels, getAttendanceMode, matchesAttendanceMode } from '@/lib/events';
import { cn } from '@/lib/utils';
import type { AttendanceMode } from '@/types';
import { Link } from '@inertiajs/react';
import { Calendar, Clock3, MapPin, Video } from 'lucide-react';
import type { ReactNode } from 'react';

interface EventCardProps {
    titulo: string;
    fecha: string;
    hora?: string | null;
    descripcion?: string | null;
    imagen?: string | null;
    enlace?: string | null;
    lugar?: string | null;
    is_online?: boolean;
    attendance_mode?: AttendanceMode;
    status_label?: string | null;
    registration_url?: string | null;
    online_url?: string | null;
    isOngoing?: boolean;
    isPast?: boolean;
    priority?: boolean;
}

const fallbackImageSrc = '/images/event-placeholder.png';

function EventBadge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'secondary' | 'hybrid' | 'live' | 'finished' }) {
    const styles = {
        default: 'bg-muted text-foreground',
        secondary: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
        hybrid: 'bg-violet-100 text-violet-800 dark:bg-violet-400/15 dark:text-violet-200',
        live: 'bg-emerald-700 text-white dark:bg-emerald-300 dark:text-zinc-950',
        finished: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900',
    };

    return (
        <Badge className={cn('rounded-full border-0 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase', styles[variant])}>
            {children}
        </Badge>
    );
}

function MetaItem({ icon: Icon, children }: { icon: React.ElementType; children: ReactNode }) {
    return (
        <div className={cn('flex items-center gap-2.5 text-xs sm:text-sm', 'text-muted-foreground')}>
            <span
                className={cn(
                    'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8',
                    'bg-muted text-muted-foreground',
                )}
            >
                <Icon aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
    attendance_mode,
    status_label,
    registration_url,
    online_url,
    isOngoing,
    isPast,
    priority = false,
}: EventCardProps) {
    const imageSrc = imagen?.trim() || fallbackImageSrc;
    const participation = { attendance_mode, is_online };
    const mode = getAttendanceMode(participation);
    const showPhysicalLocation = !!lugar && matchesAttendanceMode(participation, 'in_person');

    return (
        <article className={cn('site-card', isOngoing && !isPast && 'border-primary/40')}>
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
                    className="h-full w-full object-cover"
                    onError={({ currentTarget }) => {
                        if (currentTarget.getAttribute('src') !== fallbackImageSrc) {
                            currentTarget.src = fallbackImageSrc;
                        }
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

            <div className="site-card-body md:max-lg:p-4">
                <div className="space-y-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                        {isPast && <EventBadge variant="finished">{status_label ?? 'Finalizado'}</EventBadge>}
                        {isOngoing && !isPast && <EventBadge variant="live">{status_label ?? 'En curso'}</EventBadge>}
                        {mode && (
                            <EventBadge variant={mode === 'hybrid' ? 'hybrid' : mode === 'online' ? 'secondary' : 'default'}>
                                {attendanceLabels[mode]}
                            </EventBadge>
                        )}
                    </div>

                    <h3 className="line-clamp-3 site-card-title">{titulo}</h3>

                    {descripcion && <p className="line-clamp-3 site-card-description">{descripcion}</p>}
                </div>

                <div className="mt-5 grid gap-2.5">
                    <MetaItem icon={Calendar}>{fecha}</MetaItem>

                    {hora && <MetaItem icon={Clock3}>{hora}</MetaItem>}

                    {showPhysicalLocation && <MetaItem icon={MapPin}>{lugar}</MetaItem>}

                    {!isPast && online_url && matchesAttendanceMode(participation, 'online') && (
                        <MetaItem icon={Video}>
                            <SiteButton asChild variant="ghost" className="px-0 hover:bg-transparent hover:underline">
                                <a href={online_url} target="_blank" rel="noopener noreferrer">
                                    Acceder online<span className="sr-only"> (se abre en una pestaña nueva)</span>
                                </a>
                            </SiteButton>
                        </MetaItem>
                    )}
                </div>

                <div className="site-card-footer">
                    <div className="flex flex-wrap items-center gap-3">
                        {!isPast && registration_url && (
                            <SiteButton asChild>
                                <a href={registration_url} target="_blank" rel="noopener noreferrer">
                                    Inscribirse<span className="sr-only"> (se abre en una pestaña nueva)</span>
                                </a>
                            </SiteButton>
                        )}
                        {enlace && (
                            <SiteButton asChild variant={!isPast && registration_url ? 'secondary' : 'primary'}>
                                <Link href={enlace}>{isPast ? 'Ver detalles' : 'Ver actividad'}</Link>
                            </SiteButton>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

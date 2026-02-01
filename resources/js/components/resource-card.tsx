import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, FileText, Link as LinkIcon } from 'lucide-react';

interface RecursoCardProps {
    titulo: string;
    tipo: string;
    fecha: string;
    enlace?: string | null;
    imagen?: string | null;
}

export default function ResourceCard({ titulo, tipo, fecha, enlace, imagen }: RecursoCardProps) {
    const href = enlace?.trim() || undefined; // ✅ string | undefined
    const isAvailable = Boolean(href);
    const imageSrc = imagen?.trim() ? imagen : null;

    const card = (
        <Card
            className={[
                'relative flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-background shadow-sm transition-all duration-300',
                'animate-in fade-in slide-in-from-bottom-8 motion-reduce:transform-none motion-reduce:animate-none',
                isAvailable
                    ? 'hover:-translate-y-1 hover:border-red-600/50 hover:shadow-xl hover:shadow-red-500/10 dark:hover:border-red-400/40'
                    : 'opacity-80',
            ].join(' ')}
        >
            {/* Top bar: base primary, hover rojo */}
            <div
                className={[
                    'h-1 w-full transition-colors duration-300',
                    isAvailable ? 'bg-primary group-hover:bg-red-600 dark:group-hover:bg-red-400' : 'bg-border',
                ].join(' ')}
            />

            {/* Image / placeholder */}
            <div className="relative h-44 w-full overflow-hidden">
                {imageSrc ? (
                    <>
                        <img
                            src={imageSrc}
                            alt={`Imagen del recurso: ${titulo}`}
                            className={[
                                'h-full w-full object-cover transition-transform duration-500',
                                isAvailable ? 'group-hover:scale-[1.04]' : '',
                            ].join(' ')}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center bg-muted/40">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <FileText className="h-6 w-6" />
                            <span className="text-sm font-semibold">Sin previsualización</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <CardHeader className="flex flex-grow flex-col space-y-3 p-6 pb-4">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <span className="inline-flex items-center gap-2 font-semibold text-primary transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-400">
                        <FileText className="h-4 w-4" />
                        {tipo}
                    </span>

                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {fecha}
                    </span>
                </div>

                {/* Title */}
                <CardTitle className="line-clamp-2 text-xl leading-snug font-bold text-foreground transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-400">
                    {titulo}
                </CardTitle>
            </CardHeader>

            {/* Footer / CTA */}
            <CardContent className="p-6 pt-0">
                {isAvailable ? (
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3 group-hover:text-red-600 dark:group-hover:text-red-400">
                        <LinkIcon className="h-4 w-4" />
                        Ver recurso online
                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </div>
                ) : (
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        Recurso no disponible
                    </div>
                )}
            </CardContent>
        </Card>
    );

    // ✅ Render condicional para evitar el problema de tipos con href null
    return isAvailable ? (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir recurso: ${titulo}`}
            className="group block h-full cursor-pointer"
        >
            {card}
        </a>
    ) : (
        <div className="group block h-full cursor-default">{card}</div>
    );
}

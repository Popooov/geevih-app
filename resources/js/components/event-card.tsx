import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Calendar } from 'lucide-react';

interface EventCardProps {
    titulo: string;
    fecha: string;
    descripcion: string;
    enlace?: string;
    imagen?: string;
}

export default function EventCard({ titulo, fecha, descripcion, enlace, imagen }: EventCardProps) {
    return (
        <Link href={enlace ?? '#'} className="transition hover:shadow-md rounded-xl" prefetch>
            <Card className="flex flex-col justify-between overflow-hidden">
                {/* HEADER: imagen + título */}
                <CardHeader className="relative h-40 p-0">
                    <img
                        src={imagen ?? '/images/evento-placeholder.jpg'}
                        alt={`Imagen del evento: ${titulo}`}
                        className="h-full w-full rounded-t-xl object-cover"
                    />
                    <div className="absolute inset-0 flex items-end rounded-t-xl bg-black/60 p-4">
                        <CardTitle className="text-base text-white">{titulo}</CardTitle>
                    </div>
                </CardHeader>

                {/* CONTENT: fecha y descripción */}
                <CardContent className="space-y-2 pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{fecha}</span>
                    </div>
                    <CardDescription>{descripcion}</CardDescription>
                </CardContent>

                {/* FOOTER: enlace si existe */}
                {enlace && (
                    <CardFooter className="pb-4">
                        <p className="text-sm text-primary underline hover:opacity-80">
                            Más información →
                        </p>
                    </CardFooter>
                )}
            </Card>
        </Link>
    );
}

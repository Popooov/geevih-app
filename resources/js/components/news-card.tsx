import { Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';

interface NoticiaCardProps {
    titulo: string;
    fecha: string;
    resumen: string;
    imagen?: string;
    enlace?: string;
}

export default function NewsCard({ titulo, fecha, resumen, imagen, enlace }: NoticiaCardProps) {
    return (
        <Link href={enlace ?? '#'} className="rounded-xl transition hover:shadow-md" prefetch>
            <Card className="overflow-hidden">
                <div className="relative h-40 w-full">
                    <img
                        src={imagen ?? '/images/noticia-placeholder.jpg'}
                        alt={`Imagen noticia: ${titulo}`}
                        className="h-full w-full rounded-t-xl object-cover"
                    />
                </div>
                <CardContent className="space-y-2 pt-4">
                    <p className="text-sm text-muted-foreground">{fecha}</p>
                    <h3 className="text-base font-semibold">{titulo}</h3>
                    <p className="text-sm">{resumen}</p>
                    {enlace && (
                        <p className="text-sm text-primary underline hover:opacity-80">
                            Leer más →
                        </p>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}

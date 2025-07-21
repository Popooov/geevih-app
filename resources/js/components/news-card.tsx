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
        <Card className="overflow-hidden transition hover:shadow-md">
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
                    <a href={enlace} className="text-sm text-primary underline hover:opacity-80">
                        Leer más →
                    </a>
                )}
            </CardContent>
        </Card>
    );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface RecursoCardProps {
    titulo: string;
    tipo: string;
    fecha: string;
    enlace?: string | null;
    imagen?: string | null;
}

export default function ResourceCard({ titulo, tipo, fecha, enlace, imagen }: RecursoCardProps) {

    return (
        <Card className="overflow-hidden transition hover:shadow-md">
            <div className="h-40 w-full overflow-hidden rounded-t-md bg-gray-100">
                {imagen ? (
                    <img src={imagen} alt={`Imagen ${titulo}`} className="h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Sin imagen</div>
                )}
            </div>

            <CardHeader className="flex items-start gap-3 pt-3 pb-2">
                <FileText className="mt-1 h-6 w-6 text-muted-foreground" />
                <div>
                    <CardTitle className="text-base">{titulo}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                        {tipo} • {fecha}
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                {enlace ? (
                    <a href={enlace} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline hover:opacity-80">
                        Ver / Descargar recurso →
                    </a>
                ) : (
                    <span className="text-sm text-gray-400">Recurso no disponible</span>
                )}
            </CardContent>
        </Card>
    );
}

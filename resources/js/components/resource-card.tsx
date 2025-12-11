import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Link as LinkIcon, Calendar } from 'lucide-react';

interface RecursoCardProps {
    titulo: string;
    tipo: string;
    fecha: string;
    enlace?: string | null;
    imagen?: string | null;
}

export default function ResourceCard({ titulo, tipo, fecha, enlace, imagen }: RecursoCardProps) {

    // Logic to determine action text and icon
    const isAvailable = !!enlace;
    const linkText = isAvailable
        ? (enlace.startsWith('http') ? 'Ver recurso online' : 'Descargar recurso')
        : 'Recurso no disponible';
    const ActionIcon = isAvailable
        ? (enlace.startsWith('http') ? LinkIcon : Download)
        : FileText; // Use FileText for unavailable resource status

    return (
        // Enhanced Card Styling: shadow-lg, rounded-xl, subtle transition, and primary color hover effect
        <Card className={`
            h-full flex flex-col overflow-hidden rounded-xl shadow-lg
            transition-all duration-300 ease-in-out
            ${isAvailable
                ? 'hover:border-amber-500 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer'
                : 'opacity-80'
            }
        `}>

            {/* Image / Placeholder Header */}
            <div className="h-40 w-full overflow-hidden">
                {imagen ? (
                    <img
                        src={imagen}
                        alt={`Imagen ${titulo}`}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                        <FileText className="h-8 w-8 mr-2" />
                        <span className="text-base font-medium">Sin previsualización</span>
                    </div>
                )}
            </div>

            {/* Card Content (Flex-grow ensures the title area adapts) */}
            <CardHeader className="flex-grow flex flex-col p-4 space-y-3">

                {/* Type and Date Metadata in a single line */}
                <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                    {/* Tipo (Highlighted with a custom color for emphasis) */}
                    <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                        <FileText className="h-4 w-4" />
                        {tipo}
                    </span>
                    {/* Fecha */}
                    <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {fecha}
                    </span>
                </div>

                {/* Title (Larger and more prominent) */}
                <CardTitle className="text-xl font-bold leading-snug pt-1 line-clamp-2">
                    {titulo}
                </CardTitle>

                {/* Description slot is removed for tighter design, but could be re-added if needed */}
                <CardDescription className="hidden"></CardDescription>
            </CardHeader>

            {/* Footer / Action Link */}
            <CardContent className="p-4 pt-0">
                {isAvailable ? (
                    // Use text-primary for the action link style
                    <a
                        href={enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
                    >
                        <ActionIcon className="h-4 w-4" />
                        {linkText} →
                    </a>
                ) : (
                    // Style for unavailable resource
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <ActionIcon className="h-4 w-4" />
                        {linkText}
                    </span>
                )}
            </CardContent>
        </Card>
    );
}

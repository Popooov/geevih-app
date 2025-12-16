import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, FileText, Link as LinkIcon } from 'lucide-react';

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
    const linkText = isAvailable ? 'Ver recurso online' : 'Recurso no disponible';
    const ActionIcon = isAvailable
        ? LinkIcon // Always use LinkIcon for viewing online
        : FileText;

    return (
        // Enhanced Card Styling: shadow-lg, rounded-xl, subtle transition, and primary color hover effect
        <Card
            className={`flex h-full w-xs flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-300 ease-in-out ${
                isAvailable ? 'cursor-pointer hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-xl' : 'opacity-80'
            } `}
        >
            {/* Image / Placeholder Header */}
            <div className="h-40 w-full overflow-hidden">
                {imagen ? (
                    <img src={imagen} alt={`Imagen ${titulo}`} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                ) : (
                    <div className="flex h-full items-center justify-center bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        <FileText className="mr-2 h-8 w-8" />
                        <span className="text-base font-medium">Sin previsualización</span>
                    </div>
                )}
            </div>

            {/* Card Content (Flex-grow ensures the title area adapts) */}
            <CardHeader className="flex flex-grow flex-col space-y-3 p-4">
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
                <CardTitle className="line-clamp-2 pt-1 text-xl leading-snug font-bold">{titulo}</CardTitle>

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

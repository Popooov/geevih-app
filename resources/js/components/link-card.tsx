import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface LinksCardProps {
    href: string;
    titulo: string;
    descripcion?: string;
}

export default function LinkCard({ href, titulo, descripcion }: LinksCardProps) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="group block transition-colors" aria-label={`Abrir enlace: ${titulo}`}>
            <Card className="border-slate-200 transition-colors group-hover:bg-slate-50 dark:border-slate-800 dark:group-hover:bg-slate-800/50">
                <div className="flex items-center justify-between p-6">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-red-600 dark:text-white">{titulo}</h3>
                        {descripcion && <p className="text-sm text-slate-500 dark:text-slate-400">{descripcion}</p>}
                    </div>

                    <div className="text-slate-300 transition-colors group-hover:text-red-600 dark:text-slate-600" aria-hidden>
                        <ExternalLink className="h-5 w-5" />
                    </div>
                </div>
            </Card>
        </a>
    );
}

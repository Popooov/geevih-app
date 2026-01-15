import { ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface LinksCardProps {
    href: string;
    title: string;
    description?: string;
}


export default function LinkCard({ href, title, description }: LinksCardProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block transition-colors"
        >
            <Card className="border-slate-200 dark:border-slate-800 transition-colors group-hover:bg-slate-50 dark:group-hover:bg-slate-800/50">
                <div className="flex items-center justify-between p-6">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">
                            {title}
                        </h3>
                        {description && (
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {description}
                            </p>
                        )}
                    </div>

                    <div className="text-slate-300 dark:text-slate-600 group-hover:text-red-600 transition-colors">
                        <ExternalLink className="h-5 w-5" />
                    </div>
                </div>
            </Card>
        </a>
    );
}

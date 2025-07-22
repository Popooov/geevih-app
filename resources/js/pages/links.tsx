import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ExternalLink, Link as LinkIcon } from 'lucide-react';

export default function Links() {
    return (
        <AppLayout>
            <Head title="Enlaces" />
            <main className="mx-auto max-w-4xl space-y-10 p-6">
                <h1 className="mt-6 flex items-center gap-2 text-center text-3xl font-bold lg:mt-8">
                    <LinkIcon className="h-6 w-6 text-primary" />
                    Enlaces de interés
                </h1>

                <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-center gap-3">
                        <ExternalLink className="h-4 w-4 text-primary" />
                        <a href="https://www.seisida.net" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            SEISIDA – Sociedad Española Interdisciplinaria del Sida
                        </a>
                    </li>
                    <li className="flex items-center gap-3">
                        <ExternalLink className="h-4 w-4 text-primary" />
                        <a href="https://www.mscbs.gob.es" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Ministerio de Sanidad – Estrategia del VIH y otras ITS
                        </a>
                    </li>
                    <li className="flex items-center gap-3">
                        <ExternalLink className="h-4 w-4 text-primary" />
                        <a href="https://www.unaids.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            ONUSIDA – Programa Conjunto de las Naciones Unidas sobre el VIH/Sida
                        </a>
                    </li>
                </ul>
            </main>
        </AppLayout>
    );
}

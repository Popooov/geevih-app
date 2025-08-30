import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Send } from 'lucide-react';

export default function Contact() {
    return (
        <AppLayout>
            <Head title="Contacto" />
            <div className="mx-auto max-w-3xl space-y-10 p-6">
                <h1 className="mt-6 text-center text-3xl font-bold lg:mt-8">Contacto</h1>
                <p className="text-muted-foreground">
                    Si deseas contactar con el Grupo de Enfermería Experta en VIH (GEEVIH), colaborar en alguna de nuestras iniciativas o resolver
                    dudas, puedes escribirnos a:
                </p>

                <div className="rounded-md border bg-muted p-4 text-foreground">
                    <p className="flex items-center gap-2 text-lg font-medium">
                        <Send className="h-5 w-5 text-primary" />
                        <span>geevih@seisida.net</span>
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}

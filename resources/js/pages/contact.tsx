import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Send, Mail } from 'lucide-react';

export default function Contact() {
    const email = "geevih@seisida.net";

    return (
        <AppLayout>
            <Head title="Contacto" />
            <div className="mx-auto max-w-6xl space-y-16 p-6 pt-16">
                <header className="space-y-3 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h1 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">Contacto</h1>
                        <p className="mx-auto max-w-3xl text-center text-gray-600 md:text-xl dark:text-gray-400">
                            Si deseas contactar con el Grupo de Enfermería Experta en VIH (GEEVIH), colaborar en alguna de nuestras iniciativas o
                            resolver dudas, puedes escribirnos a:
                        </p>
                    </div>
                </header>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8 dark:border-slate-800 dark:bg-slate-900/50">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium tracking-wider text-slate-500 uppercase">Correo electrónico</p>
                                <a
                                    href={`mailto:${email}`}
                                    className="text-xl font-bold text-slate-900 transition-colors hover:text-red-600 md:text-2xl dark:text-white"
                                >
                                    {email}
                                </a>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <a
                                href={`mailto:${email}`}
                                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700 active:scale-95"
                            >
                                <Send className="h-4 w-4" />
                                Enviar mensaje
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

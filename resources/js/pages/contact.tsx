import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Mail, Send } from 'lucide-react';

export default function Contact() {
    const email = 'geevih@seisida.net';

    return (
        <AppLayout>
            <Head title="Contacto" />

            <div className="mx-auto max-w-6xl space-y-14 px-6 py-12 md:py-16">
                {/* Header */}
                <header className="space-y-4 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">Contacto</h1>
                    <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground md:text-xl">
                        Si deseas contactar con el Grupo de Enfermería Experta en VIH (GEEVIH), colaborar en alguna de nuestras iniciativas o resolver
                        dudas, puedes escribirnos a:
                    </p>
                </header>

                {/* Card */}
                <section
                    className={[
                        'overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm',
                        'duration-500 animate-in fade-in slide-in-from-bottom-8 motion-reduce:transform-none motion-reduce:animate-none',
                        'transition-all hover:-translate-y-0.5 hover:border-red-600/40 hover:shadow-xl hover:shadow-red-500/10 dark:hover:border-red-400/30',
                    ].join(' ')}
                >
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            {/* Left */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                    <Mail className="h-6 w-6" />
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Correo electrónico</p>

                                    <a
                                        href={`mailto:${email}`}
                                        className="block text-xl font-extrabold text-foreground transition-colors hover:text-red-600 md:text-2xl dark:hover:text-red-400"
                                    >
                                        {email}
                                    </a>

                                    <p className="text-sm text-muted-foreground">Te responderemos lo antes posible.</p>
                                </div>
                            </div>

                            {/* Right / CTA */}
                            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                                <a
                                    href={`mailto:${email}`}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700 active:scale-[0.98] dark:shadow-red-500/10"
                                >
                                    <Send className="h-4 w-4" />
                                    Enviar mensaje
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Subtle footer */}
                    <div className="border-t border-border/70 bg-muted/20 px-6 py-4 text-sm text-muted-foreground md:px-8">
                        Consejo: incluye tu nombre, centro/organización y el motivo del contacto.
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}

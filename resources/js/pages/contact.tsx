import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Mail, Send } from 'lucide-react';

export default function Contact() {
    const email = 'geevih@seisida.net';

    return (
        <AppLayout>
            <Head title="Contacto | GEEVIH" />

            <div className="mx-auto max-w-6xl px-6 pt-6 pb-10 lg:px-8 lg:pt-10 lg:pb-14">
                <div className="space-y-10 lg:space-y-12">
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/85 px-6 py-10 text-center backdrop-blur-xl md:px-8 md:py-12 dark:bg-background/70">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.12),transparent_60%)]" />

                        <div className="relative mx-auto max-w-3xl">
                            <h1 className="text-4xl font-extrabold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">Contacto</h1>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                                Si deseas contactar con el Grupo de Enfermería Experta en VIH (GEEVIH), puedes escribirnos por correo electrónico.
                            </p>
                        </div>
                    </section>

                    <section className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-card/80 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                        <div className="p-6 md:p-8">
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                <div className="flex flex-1 items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                        <Mail className="h-6 w-6" />
                                    </div>

                                    <div className="min-w-0 flex-1 space-y-2">
                                        <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">Correo electrónico</p>

                                        <a
                                            href={`mailto:${email}`}
                                            className="block text-xl font-extrabold tracking-tight break-words text-foreground transition-colors hover:text-red-600 md:text-2xl dark:hover:text-red-400"
                                        >
                                            {email}
                                        </a>

                                        <p className="text-sm leading-relaxed text-muted-foreground">Te responderemos lo antes posible.</p>
                                    </div>
                                </div>

                                <div className="md:shrink-0 md:pl-6">
                                    <a
                                        href={`mailto:${email}`}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/15 transition-colors hover:bg-red-700 sm:w-auto"
                                    >
                                        <Send className="h-4 w-4" />
                                        Enviar mensaje
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="text-center">
                        <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground">
                            Consejo: indica tu nombre, centro u organización y el motivo del contacto.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

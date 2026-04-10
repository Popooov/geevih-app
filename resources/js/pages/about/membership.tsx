import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Mail, UserPlus } from 'lucide-react';

const typeformUrl = 'https://seisida.typeform.com/to/kZwwPgdK';
const contactEmail = 'geevih@seisida.net';

export default function Membership() {
    return (
        <AppLayout>
            <Head title="Hazte socio | GEEVIH" />

            <div className="mx-auto max-w-6xl px-6 pt-6 pb-12 lg:px-8 lg:pt-10 lg:pb-14">
                <div className="space-y-14">
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/85 px-6 py-12 text-center backdrop-blur-xl dark:bg-background/70">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.12),transparent_60%)]" />

                        <div className="relative mx-auto max-w-3xl">
                            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Sobre GEEVIH</p>

                            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
                                Hazte socio
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                                Forma parte de una comunidad profesional comprometida con la excelencia en los cuidados de enfermería en VIH, la
                                formación continua y la mejora de la práctica clínica.
                            </p>
                        </div>
                    </section>

                    <section className="rounded-[2rem] bg-background/95 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5 lg:p-10 dark:bg-neutral-900 dark:ring-white/10">
                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                                <UserPlus className="h-7 w-7" />
                            </div>

                            <div className="space-y-3">
                                <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">Incorporación al grupo</p>

                                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                    Participa en una red profesional activa y comprometida
                                </h2>

                                <p className="max-w-4xl leading-8 text-muted-foreground">
                                    Si eres profesional de enfermería y tienes interés en el ámbito del VIH, te animamos a formar parte de GEEVIH. El
                                    grupo impulsa la formación, la investigación y la mejora de los cuidados a través del trabajo colaborativo y el
                                    intercambio de conocimiento.
                                </p>

                                <p className="max-w-4xl leading-8 text-muted-foreground">
                                    La incorporación se realiza mediante un formulario externo. Una vez enviada la solicitud, el equipo revisará la
                                    información recibida y dará respuesta con los siguientes pasos del proceso.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-4 md:grid-cols-2">
                        <Card className="border-0 bg-background/95 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md dark:bg-neutral-900 dark:ring-white/10">
                            <CardContent className="space-y-4 p-6 lg:p-7">
                                <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">Solicitud</p>

                                <h2 className="text-xl font-semibold tracking-tight text-foreground">¿Cómo solicitar la incorporación?</h2>

                                <p className="leading-8 text-muted-foreground">
                                    Accede al formulario de solicitud y envía tus datos para iniciar el proceso de incorporación al grupo.
                                </p>

                                <div className="pt-2">
                                    <a
                                        href={typeformUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#af101a_0%,#d32f2f_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(175,16,26,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(175,16,26,0.22)]"
                                    >
                                        Ir al formulario
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-background/95 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md dark:bg-neutral-900 dark:ring-white/10">
                            <CardContent className="space-y-4 p-6 lg:p-7">
                                <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">Contacto</p>

                                <h2 className="text-xl font-semibold tracking-tight text-foreground">¿Tienes dudas?</h2>

                                <p className="leading-8 text-muted-foreground">
                                    Si necesitas más información sobre el proceso de incorporación o la actividad del grupo, puedes escribirnos
                                    directamente.
                                </p>

                                <div className="pt-1">
                                    <a
                                        href={`mailto:${contactEmail}`}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
                                    >
                                        <Mail className="h-4 w-4" />
                                        {contactEmail}
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

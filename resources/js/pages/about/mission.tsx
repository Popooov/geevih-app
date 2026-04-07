import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { BookOpen, HeartPulse, Quote, ShieldCheck, Target } from 'lucide-react';

export default function Mission() {
    return (
        <AppLayout>
            <Head title="Misión y Objetivos | GEEVIH" />

            <div className="mx-auto max-w-6xl px-6 lg:px-8 pt-6 pb-12 lg:pt-10 lg:pb-14">
                <div className="space-y-14">
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/85 px-6 py-12 text-center backdrop-blur-xl dark:bg-background/70">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.12),transparent_60%)]" />

                        <div className="relative mx-auto max-w-3xl">
                            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Sobre GEEVIH</p>

                            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
                                Misión y Objetivos
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                                El Grupo de Enfermería Experta en VIH (GEEVIH), integrado en SEISIDA, trabaja para impulsar la excelencia en cuidados,
                                la investigación enfermera y la mejora de la calidad de vida de las personas con VIH.
                            </p>
                        </div>
                    </section>

                    <section className="rounded-[2rem] bg-background/95 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5 lg:p-10 dark:bg-neutral-900 dark:ring-white/10">
                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                                <Target className="h-7 w-7" />
                            </div>

                            <div className="space-y-3">
                                <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">Nuestra misión</p>
                                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                    Ser un referente en los cuidados enfermeros en VIH
                                </h2>
                                <p className="max-w-4xl leading-8 text-muted-foreground">
                                    GEEVIH nace con la misión de ser un referente en el ámbito de los cuidados a las personas con VIH en todos los
                                    servicios sanitarios del territorio español. Contribuimos activamente al diagnóstico precoz del VIH/ITS y en la mejora de la
                                    calidad de vida de las personas que viven con el VIH a través de la excelencia enfermera, la investigación y la formación continua.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="text-center">
                            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Líneas de actuación</p>
                            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Objetivos del grupo</h2>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <Card className="h-full border-0 bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-neutral-900 dark:ring-white/10 dark:hover:bg-neutral-800">
                                <CardContent className="space-y-4 p-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        <ShieldCheck className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground">Liderazgo</h3>
                                    <p className="text-sm leading-7 text-muted-foreground">
                                        Consolidar el liderazgo enfermero en el cuidado integral de las personas con VIH.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="h-full border-0 bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-neutral-900 dark:ring-white/10 dark:hover:bg-neutral-800">
                                <CardContent className="space-y-4 p-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                        <BookOpen className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground">Formación</h3>
                                    <p className="text-sm leading-7 text-muted-foreground">
                                        Promover la formación continua y la investigación de excelencia en el ámbito del VIH.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="h-full border-0 bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-neutral-900 dark:ring-white/10 dark:hover:bg-neutral-800">
                                <CardContent className="space-y-4 p-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                        <HeartPulse className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground">Sensibilización</h3>
                                    <p className="text-sm leading-7 text-muted-foreground">
                                        Sensibilizar a la comunidad sobre la importancia de los cuidados de enfermería en VIH.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card className="border-0 bg-background/95 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md dark:bg-neutral-900 dark:ring-white/10">
                            <CardContent className="space-y-4 p-6 lg:p-7">
                                <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">Principios fundamentales</p>
                                <h2 className="text-xl font-semibold tracking-tight text-foreground">Cuidados integrales y libres de estigma</h2>
                                <p className="leading-8 text-muted-foreground">
                                    La prestación de cuidados de enfermería integrales, libres de estigma y discriminación, es un principio básico de GEEVIH.
                                    Consideramos que la investigación enfermera de excelencia es imprescindible para mejorar la atención y calidad de vida de las PVIH.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-background/95 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md dark:bg-neutral-900 dark:ring-white/10">
                            <CardContent className="space-y-4 p-6 lg:p-7">
                                <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">Integración en SEISIDA</p>
                                <h2 className="text-xl font-semibold tracking-tight text-foreground">Una plataforma colaborativa sólida</h2>
                                <p className="leading-8 text-muted-foreground">
                                    Gracias a su integración en SEISIDA, el grupo cuenta con una plataforma colaborativa robusta para impulsar la
                                    formación, la investigación innovadora, la colaboración activa, para avanzar en el conocimiento y la práctica enfermera exeprta en VIH en España.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <section className="relative overflow-hidden rounded-[2rem] bg-primary/5 px-8 py-10 text-center text-xl ring-1 ring-primary/10 md:px-16 md:py-14 md:text-2xl dark:bg-primary/10">
                        <Quote className="absolute top-5 left-5 h-9 w-9 rotate-180 text-primary/20" />

                        <blockquote className="mx-auto max-w-4xl space-y-5">
                            <p className="text-lg leading-8 font-medium text-foreground italic md:text-2xl md:leading-10">
                                “GEEVIH surge de la necesidad de crear un espacio donde las enfermeras que trabajan en el ámbito del VIH puedan desarrollar iniciativas que permitan
                                alcanzar la excelencia en la práctica clínica, la investigación y la formación continua.”
                            </p>
                            <footer className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">Equipo de Dirección</footer>
                        </blockquote>

                        <Quote className="absolute right-5 bottom-5 h-9 w-9 text-primary/20" />
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

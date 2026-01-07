import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BookOpen, HeartPulse, Quote, ShieldCheck, Target, Users } from 'lucide-react';

export default function About() {
    return (
        <AppLayout>
            <Head title="Sobre" />

            <div className="mx-auto max-w-5xl space-y-16 px-6 py-12">
                {/* Header Section */}
                <section className="space-y-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">Sobre el GEEVIH</h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
                        El Grupo de Enfermería Experta en VIH (GEEVIH), integrado en SEISIDA, trabaja para potenciar la educación, la investigación y
                        la calidad de vida de las personas con VIH.
                    </p>

                    <div className="flex justify-center pt-4">
                        <Link
                            href="/sobre/equipo"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:gap-3 hover:bg-primary/90 hover:shadow-lg"
                        >
                            <Users className="h-4 w-4" />
                            Conoce a nuestro equipo <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                <div className="grid gap-12 md:grid-cols-1">
                    {/* Mission Section (Highlighted) */}
                    <section className="rounded-2xl bg-muted/50 p-8 md:p-10">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                <Target className="h-6 w-6" />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-2xl font-semibold">Nuestra Misión</h2>
                                <p className="leading-relaxed text-muted-foreground">
                                    GEEVIH nace con la misión de ser un referente en el ámbito de los cuidados a las PVIH en todos los servicios
                                    sanitarios del territorio español. Contribuimos activamente en el diagnóstico precoz y en la mejora de la calidad
                                    de vida a través de la excelencia enfermera, la investigación y la formación continua.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-1 rounded-full bg-primary"></div>
                            <h2 className="text-2xl font-semibold">Objetivos del grupo</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <Card className="bg-background transition-shadow hover:shadow-md">
                                <CardContent className="space-y-3 pt-6">
                                    {/* Objetivo 1: Liderazgo */}
                                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">
                                        <ShieldCheck className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h3 className="font-medium text-foreground">Liderazgo</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Consolidar el liderazgo en el cuidado integral de las personas con VIH.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-background transition-shadow hover:shadow-md">
                                <CardContent className="space-y-3 pt-6">
                                    {/* Objetivo 2: Formación */}
                                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                                        <BookOpen className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h3 className="font-medium text-foreground">Formación</h3>
                                    <p className="text-sm text-muted-foreground">Promover la formación continua y la investigación de excelencia.</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-background transition-shadow hover:shadow-md">
                                <CardContent className="space-y-3 pt-6">
                                    {/* Objetivo 3: Sensibilización */}
                                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30 dark:text-red-400">
                                        <HeartPulse className="h-8 w-8 text-red-600" />
                                    </div>
                                    <h3 className="font-medium text-foreground">Sensibilización</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Sensibilizar a la comunidad sobre los cuidados de enfermería en VIH.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Two Column Layout: Principles & SEISIDA */}
                    <div className="grid gap-8 md:grid-cols-2">
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold">Principios Fundamentales</h2>
                            <p className="leading-relaxed text-muted-foreground">
                                Cuidados de enfermería integrales,{' '}
                                <span className="font-medium text-foreground">libres de estigma y discriminación</span>, son principios básicos de
                                GEEVIH. Todo ello sin olvidar la investigación enfermera de excelencia.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold">Integración en SEISIDA</h2>
                            <p className="leading-relaxed text-muted-foreground">
                                Gracias a su integración en SEISIDA, el grupo cuenta con una plataforma colaborativa robusta para la defensa de los
                                derechos y la igualdad de acceso a servicios de calidad.
                            </p>
                        </section>
                    </div>

                    {/* Styled Quote */}
                    <section className="relative overflow-hidden rounded-xl bg-primary/5 p-8 text-center md:px-16 md:py-12">
                        <Quote className="absolute top-4 left-4 h-8 w-8 rotate-180 text-primary/20" />
                        <blockquote className="space-y-4">
                            <p className="text-lg leading-relaxed font-medium text-foreground italic md:text-xl">
                                “GEEVIH surge ante la necesidad de las enfermeras de crear un espacio donde desarrollar iniciativas que permitan
                                alcanzar la excelencia en la práctica clínica, la investigación y la formación continua.”
                            </p>
                            <footer className="text-sm font-semibold tracking-wider text-primary uppercase">— Equipo de Dirección</footer>
                        </blockquote>
                        <Quote className="absolute right-4 bottom-4 h-8 w-8 text-primary/20" />
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

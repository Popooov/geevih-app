import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, UserPlus } from 'lucide-react';

export default function Home() {
    return (
        <AppLayout>
            <Head title="Inicio" />

            <div className="min-h-[calc(100vh-80px)]">
                <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                    <section className="relative w-full overflow-hidden rounded-[2rem] bg-background/85 px-6 py-14 text-center backdrop-blur-xl sm:px-8 lg:px-10 lg:py-20 dark:bg-background/70">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.14),transparent_50%)]" />

                        <div className="relative mx-auto max-w-4xl">
                            <div className="flex justify-center">
                                <img src="images/geevih-logo.png" alt="Logo GEEVIH" className="h-auto w-56 sm:w-64" />
                            </div>

                            <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
                                Grupo de Enfermería Experta en <span className="text-primary">VIH</span>
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                                Impulsamos el liderazgo enfermero en el ámbito del VIH mediante formación continua, investigación y transferencia de
                                conocimiento orientada a mejorar los cuidados y la calidad de vida de las personas.
                            </p>

                            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                                <Link
                                    href="/sobre/sobre-nosotros"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#af101a_0%,#d32f2f_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(175,16,26,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(175,16,26,0.22)]"
                                >
                                    Conoce GEEVIH
                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <a
                                    href="https://seisida.typeform.com/to/kZwwPgdK"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-background/80 px-6 py-3 text-sm font-semibold text-foreground ring-1 ring-border/70 backdrop-blur-sm transition-colors hover:bg-muted"
                                >
                                    Hacerse socio
                                    <UserPlus className="h-4 w-4" />
                                </a>
                            </div>
                        </div>

                        <div className="relative mt-12 grid gap-4 md:grid-cols-3">
                            <Link
                                href="/formacion/cursos"
                                className="rounded-2xl bg-white p-5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:ring-white/10 dark:hover:bg-neutral-800"
                            >
                                <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">Formación</p>
                                <p className="mt-3 text-base font-semibold text-foreground">Cursos, webinars y jornadas</p>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    Actualización profesional y actividades formativas en el ámbito del VIH.
                                </p>
                            </Link>

                            <Link
                                href="/sobre/areas-de-trabajo"
                                className="rounded-2xl bg-white p-5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:ring-white/10 dark:hover:bg-neutral-800"
                            >
                                <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">Investigación</p>
                                <p className="mt-3 text-base font-semibold text-foreground">Evidencia y proyectos</p>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    Publicaciones, líneas de trabajo y generación de conocimiento aplicado.
                                </p>
                            </Link>

                            <Link
                                href="/recursos/guias"
                                className="rounded-2xl bg-white p-5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:ring-white/10 dark:hover:bg-neutral-800"
                            >
                                <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">Recursos</p>
                                <p className="mt-3 text-base font-semibold text-foreground">Guías y materiales</p>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    Protocolos, documentos y materiales de apoyo para profesionales.
                                </p>
                            </Link>
                        </div>
                    </section>

                    <section className="w-full">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Accesos rápidos</p>
                            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                Recursos y accesos clave del grupo
                            </h2>
                            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                                Consulta documentación destacada, actualidad, formación y vías de participación desde un único espacio.
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
                            <a
                                href="https://www.seisida.net/wp-content/uploads/2025/10/Documento-para-el-cuidado-enfermero-experto-de-personas-con-VIH.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group lg:col-span-12"
                                aria-label="Abrir PDF: Documento para el cuidado enfermero experto de personas con VIH (Proyecto National Policy)"
                            >
                                <Card className="group relative h-full overflow-hidden border-0 shadow-none transition-all duration-300 hover:-translate-y-1">
                                    <div
                                        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                                        style={{
                                            backgroundImage: "url('/images/documents/cuidado-enfermero-vih-cover.jpg')",
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/10" />

                                    <div className="relative flex h-full min-h-[320px] flex-col justify-between p-6 sm:min-h-[360px] sm:p-7">
                                        <div>
                                            <span className="inline-flex items-center rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                                PDF destacado
                                            </span>
                                        </div>

                                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white">
                                            <span>Abrir documento</span>
                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Card>
                            </a>

                            <Link href="/noticias" prefetch className="group lg:col-span-4">
                                <Card className="h-full border-0 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-background dark:bg-neutral-900 dark:shadow-none dark:ring-white/10 dark:hover:bg-white/8">
                                    <CardHeader className="h-full justify-between gap-8 p-6">
                                        <div>
                                            <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">Actualidad</p>
                                            <CardTitle className="mt-3 text-lg text-foreground">Últimas noticias</CardTitle>
                                            <CardDescription className="mt-3 leading-7">
                                                Lo más reciente del grupo GEEVIH, actividad científica y novedades en enfermería VIH.
                                            </CardDescription>
                                        </div>

                                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                                            Ver noticias
                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>

                            <Link href="/formacion/cursos" prefetch className="group lg:col-span-4">
                                <Card className="h-full border-0 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-background dark:bg-neutral-900 dark:shadow-none dark:ring-white/10 dark:hover:bg-white/8">
                                    <CardHeader className="h-full justify-between gap-8 p-6">
                                        <div>
                                            <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">Formación</p>
                                            <CardTitle className="mt-3 text-lg text-foreground">Cursos y webinars</CardTitle>
                                            <CardDescription className="mt-3 leading-7">
                                                Accede a cursos, webinars y otras actividades formativas impulsadas por el grupo.
                                            </CardDescription>
                                        </div>

                                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                                            Ver formación
                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>

                            <a
                                href="https://seisida.typeform.com/to/kZwwPgdK"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group lg:col-span-4"
                                aria-label="Abrir formulario para hacerse socio"
                            >
                                <Card className="h-full border-0 bg-[linear-gradient(135deg,rgba(175,16,26,0.07)_0%,rgba(211,47,47,0.035)_100%)] shadow-[0_8px_24px_rgba(175,16,26,0.04)] ring-1 ring-primary/15 transition-all duration-300 hover:-translate-y-1 dark:bg-[linear-gradient(135deg,rgba(175,16,26,0.10)_0%,rgba(211,47,47,0.05)_100%)] dark:ring-primary/20">
                                    <CardHeader className="h-full justify-between gap-8 p-6">
                                        <div>
                                            <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">Participación</p>
                                            <CardTitle className="mt-3 text-lg text-foreground">Hacerse socio</CardTitle>
                                            <CardDescription className="mt-3 leading-7">
                                                Únete al GEEVIH y participa activamente en iniciativas de formación, investigación y comunidad.
                                            </CardDescription>
                                        </div>

                                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                                            Solicitar información
                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </CardHeader>
                                </Card>
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

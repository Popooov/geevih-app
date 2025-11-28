import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BookOpenText, Calendar, Newspaper, UserPlus } from 'lucide-react';

export default function Home() {
    return (
        <AppLayout>
            <Head title="Inicio" />

            <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-background to-muted/20">
                <div className="mx-auto flex max-w-6xl flex-col items-center space-y-20 p-8 py-16">
                    <section className="relative flex flex-col items-center space-y-8 text-center duration-700 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex justify-center drop-shadow-sm transition-transform hover:scale-105">
                            <img src="images/geevih-logo.png" alt="Logo GEEVIH SEISIDA" className="mx-auto w-64 md:w-72" />
                        </div>
                        <div className="max-w-3xl space-y-4">
                            <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
                                Grupo de Enfermería Experta en <span className="text-primary">VIH</span>
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
                                Lideramos la mejora de los cuidados de enfermería, promoviendo la investigación, la formación continua y la defensa de
                                los derechos de las personas con VIH.
                            </p>
                        </div>
                        <div className="pt-2">
                            <Link
                                href="/sobre"
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:gap-3 hover:bg-primary/90 hover:shadow-lg"
                            >
                                Conoce más sobre GEEVIH <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </section>

                    <section className="w-full space-y-8">
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <span className="h-px w-12 bg-border"></span>
                            <h2 className="text-sm font-medium tracking-widest uppercase">Accesos rápidos</h2>
                            <span className="h-px w-12 bg-border"></span>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Card 1: News */}
                            <Link href="/noticias" prefetch className="group">
                                <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-transform group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
                                            <Newspaper className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg transition-colors group-hover:text-primary">Últimas noticias</CardTitle>
                                            <CardDescription className="mt-1 line-clamp-2">
                                                Lo más reciente del grupo GEEVIH y avances en enfermería VIH.
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>

                            {/* Card 2: Events */}
                            <Link href="/eventos" prefetch className="group">
                                <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 transition-transform group-hover:scale-110 dark:bg-orange-900/30 dark:text-orange-400">
                                            <Calendar className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg transition-colors group-hover:text-primary">Próximos eventos</CardTitle>
                                            <CardDescription className="mt-1 line-clamp-2">
                                                Jornadas, congresos y talleres en los que participamos.
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>

                            {/* Card 3: Publications */}
                            <Link href="/publicaciones" className="group">
                                <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-transform group-hover:scale-110 dark:bg-green-900/30 dark:text-green-400">
                                            <BookOpenText className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg transition-colors group-hover:text-primary">Publicaciones</CardTitle>
                                            <CardDescription className="mt-1 line-clamp-2">
                                                Consulta los estudios, guías y artículos más recientes.
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>

                            {/* Card 4: Join Us */}
                            <div className="group cursor-pointer">
                                <Card className="h-full border-dashed bg-muted/30 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-background hover:shadow-lg">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-transform group-hover:scale-110 dark:bg-purple-900/30 dark:text-purple-400">
                                            <UserPlus className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg transition-colors group-hover:text-primary">Hacerse socio</CardTitle>
                                            <CardDescription className="mt-1 line-clamp-2">
                                                Únete al GEEVIH y participa activamente en nuestras iniciativas.
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

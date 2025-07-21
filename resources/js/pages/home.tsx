// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: '/',
    },
];

export default function Home() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inicio" />
            <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl flex-col items-center justify-center space-y-24 p-6">
                {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                <section className="space-y-8 text-center">
                    <div className="flex justify-center">
                        <img src="geevih-logo.png" alt="Logo GEEVIH SEISIDA" className="mx-auto w-60" width={200} height={100} />
                    </div>
                    <h1 className="text-3xl font-bold">Grupo de Enfermería Experta en VIH (GEEVIH)</h1>
                    <p className="mx-auto max-w-xl text-muted-foreground">
                        Lideramos la mejora de los cuidados de enfermería en VIH, promoviendo la investigación, la formación continua y la defensa de
                        los derechos de las personas con VIH.
                    </p>
                    <div>
                        <Link href="/sobre" className="text-sm font-medium text-primary underline hover:opacity-80">
                            Conoce más sobre GEEVIH →
                        </Link>
                    </div>
                </section>
                <h2 className="mb-4 text-center text-2xl font-semibold">Accesos rápidos</h2>
                <section>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <Card>
                            <Link href="/noticias">
                                <CardContent>
                                    <CardTitle>📰 Últimas noticias</CardTitle>
                                    <CardDescription>Lo más reciente del grupo GEEVIH y avances en enfermería VIH.</CardDescription>
                                </CardContent>
                            </Link>
                        </Card>

                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <Card>
                            <Link href="/eventos">
                                <CardContent>
                                    <CardTitle>📅 Próximos eventos</CardTitle>
                                    <CardDescription>Jornadas, congresos y talleres en los que participamos.</CardDescription>
                                </CardContent>
                            </Link>
                        </Card>

                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <Card>
                            <Link href="/publicaciones">
                                <CardContent>
                                    <CardTitle>📚 Publicaciones</CardTitle>
                                    <CardDescription>Consulta los estudios y artículos más recientes.</CardDescription>
                                </CardContent>
                            </Link>
                        </Card>

                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <Card>
                            <CardContent>
                                <CardTitle>🤝 Hacerse socio</CardTitle>
                                <CardDescription>Únete al GEEVIH y participa activamente en nuestras iniciativas.</CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}

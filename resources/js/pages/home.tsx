// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
];

export default function Home() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl px-4 py-12 overflow-x-auto">
                <div className="flex min-h-[100vh] justify-center flex-1 overflow-hidden rounded-xl md:min-h-min">
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    <section className="flex flex-col justify-center items-center text-center space-y-18">
                        <div className="flex justify-center">
                            <img
                            src="geevih-logo.png"
                            alt="Logo GEEVIH SEISIDA"
                            className="w-60 mx-auto"
                            width={200}
                            height={100}
                            />
                        </div>
                        <h1 className="text-3xl font-bold">
                            Grupo de Enfermería Experta en VIH (GEEVIH)
                        </h1>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Lideramos la mejora de los cuidados de enfermería en VIH,
                            promoviendo la investigación, la formación continua y la defensa de
                            los derechos de las personas con VIH.
                        </p>
                        <div>
                            <Link
                            href="/sobre"
                            className="underline text-sm font-medium text-primary hover:opacity-80"
                            >
                            Conoce más sobre GEEVIH →
                            </Link>
                        </div>
                    </section>
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Accesos rápidos
                </h2>
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Link href="/noticias">
                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <Card className="h-full hover:shadow-md transition">
                            <CardContent className="pt-5">
                                <CardTitle className="text-base">
                                    📰 Últimas noticias
                                </CardTitle>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Lo más reciente del grupo GEEVIH y avances en enfermería VIH.
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    <Link href="/eventos">
                        <Card className="h-full hover:shadow-md transition">
                            <CardContent className="p-5">
                                <CardTitle className="text-base">
                                    📅 Próximos eventos
                                </CardTitle>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Jornadas, congresos y talleres en los que participamos.
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    <Link href="/publicaciones">
                        <Card className="h-full hover:shadow-md transition">
                            <CardContent className="p-5">
                                <CardTitle className="text-base">📚 Publicaciones</CardTitle>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Consulta los estudios y artículos más recientes.
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    <Card className="h-full hover:shadow-md transition">
                        <CardContent className="p-5">
                            <CardTitle className="text-base">🤝 Hacerse socio</CardTitle>
                            <p className="text-sm text-muted-foreground mt-2">
                            Únete al GEEVIH y participa activamente en nuestras
                            iniciativas.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

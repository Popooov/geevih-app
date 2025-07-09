import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BookOpen, Microscope, Share2 } from 'lucide-react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Areas',
        href: '/areas',
    },
];

export default function Areas() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About" />
            <main className="mx-auto max-w-6xl space-y-10 p-6">
                <h1 className="mt-6 lg:mt-8 text-3xl text-center font-bold">Áreas de Trabajo</h1>

                {/* Investigación */}
                <section className="space-y-4">
                    <h2 className="flex items-center gap-2 text-2xl font-semibold">
                        <Microscope className="h-6 w-6 text-primary" />
                        Investigación
                    </h2>
                    <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                        <li>Resumen de proyectos activos relacionados con VIH y enfermería.</li>
                        <li>Publicaciones científicas, artículos y pósters presentados.</li>
                        <li>Colaboraciones con entidades nacionales e internacionales.</li>
                    </ul>
                </section>

                {/* Formación */}
                <section className="space-y-4">
                    <h2 className="flex items-center gap-2 text-2xl font-semibold">
                        <BookOpen className="h-6 w-6 text-primary" />
                        Formación
                    </h2>
                    <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                        <li>Cursos específicos para enfermería en el ámbito del VIH.</li>
                        <li>Talleres y jornadas de actualización profesional.</li>
                        <li>Guías de buenas prácticas, protocolos y recursos educativos.</li>
                    </ul>
                </section>

                {/* Transferencia */}
                <section className="space-y-4">
                    <h2 className="flex items-center gap-2 text-2xl font-semibold">
                        <Share2 className="h-6 w-6 text-primary" />
                        Transferencia a la Comunidad
                    </h2>
                    <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                        <li>Actividades de divulgación (pueden enlazar con Recursos).</li>
                        <li>Materiales informativos para profesionales y pacientes.</li>
                        <li>Proyectos de sensibilización y educación en VIH.</li>
                        <li>Información clave sobre cuidados de enfermería en VIH.</li>
                    </ul>
                </section>
            </main>
        </AppLayout>
    );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ArrowRight, BookOpen, Microscope, Share2 } from 'lucide-react';

export default function Areas() {
    const areasData = [
        {
            icon: Microscope,
            title: 'Investigación',
            description: 'Liderazgo en proyectos científicos para el avance del conocimiento en cuidados de VIH.',
            accentColor: 'text-blue-600',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400',
            points: [
                'Proyectos activos relacionados con VIH y enfermería.',
                'Publicaciones científicas en revistas de alto impacto.',
                'Colaboraciones estratégicas con entidades nacionales.',
            ],
        },
        {
            icon: BookOpen,
            title: 'Formación',
            description: 'Garantizamos la excelencia profesional a través de recursos educativos y capacitación continua de nuestros miembros.',
            accentColor: 'text-green-600',
            iconBg: 'bg-green-100 dark:bg-green-900/30 dark:text-green-400',
            points: [
                'Cursos específicos para enfermería en el ámbito del VIH.',
                'Talleres y jornadas de actualización profesional.',
                'Elaboración de guías de buenas prácticas y protocolos.',
            ],
        },
        {
            icon: Share2,
            title: 'Transferencia a la Comunidad',
            description: 'Fomentamos la prevención, la sensibilización y la difusión de información clave para la salud pública.',
            accentColor: 'text-purple-600',
            iconBg: 'bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400',
            points: [
                'Actividades de divulgación y sensibilización.',
                'Creación de materiales informativos accesibles para pacientes.',
                'Alianzas con asociaciones de pacientes y salud pública.',
            ],
        },
    ];

    return (
        <AppLayout>
            <Head title="Áreas" />

            <div className="mx-auto max-w-6xl space-y-16 p-6 py-12">
                {/* Header Section */}
                <header className="space-y-3 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">Áreas de Trabajo</h1>
                    <p className="mx-auto max-w-xl text-lg text-muted-foreground">
                        Estructuramos nuestro trabajo en tres líneas principales de acción para maximizar el impacto en la mejora de los cuidados de enfermería en VIH.
                    </p>
                </header>

                {/* Areas Grid Section */}
                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-[auto_minmax(5rem,auto)_auto_1fr] lg:grid-cols-3">
                    {areasData.map((area, index) => (
                        <Card
                            key={index}
                            className="group row-span-4 grid h-full grid-rows-subgrid overflow-hidden border border-border/70 bg-background shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            <CardHeader className="space-y-4 p-6 pb-2">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${area.iconBg} ${area.accentColor} shadow-sm transition-transform group-hover:scale-110`}
                                >
                                    <area.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-2xl font-bold">{area.title}</CardTitle>
                            </CardHeader>

                            <CardDescription className="px-6 pt-0 pb-6 leading-relaxed text-muted-foreground">{area.description}</CardDescription>

                            <CardContent className="px-6 pt-0 pb-6">
                                <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground/80 uppercase">Detalles Clave:</h3>

                                <ul className="space-y-3">
                                    {area.points.map((point, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <ArrowRight className={`mt-1 h-4 w-4 shrink-0 ${area.accentColor}`} />
                                            <span className="text-base leading-snug text-foreground/90">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </section>
            </div>
        </AppLayout>
    );
}

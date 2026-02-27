import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ArrowRight, BookOpen, Microscope, Share2 } from 'lucide-react';

export default function Areas() {
    const areasData = [
        {
            icon: Microscope,
            title: 'Investigación',
            description: 'Liderazgo en proyectos científicos para el avance del conocimiento en cuidados de VIH.',
            accentColor: 'text-blue-600 dark:text-blue-400',
            iconBg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
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
            accentColor: 'text-green-600 dark:text-green-400',
            iconBg: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
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
            accentColor: 'text-purple-600 dark:text-purple-400',
            iconBg: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
            points: [
                'Actividades de divulgación y sensibilización.',
                'Creación de materiales informativos accesibles para pacientes.',
                'Alianzas con asociaciones de pacientes y salud pública.',
            ],
        },
    ];

    return (
        <AppLayout>
            <Head title="Áreas | GEEVIH" />

            <div className="mx-auto max-w-6xl space-y-16 p-6 py-12">
                <header className="space-y-3 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">Áreas de Trabajo</h1>
                    <p className="mx-auto max-w-xl text-lg text-muted-foreground">
                        Estructuramos nuestro trabajo en tres líneas principales de acción para maximizar el impacto en la mejora de los cuidados de
                        enfermería en VIH.
                    </p>
                </header>

                <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {areasData.map((area, index) => {
                        const Icon = area.icon;

                        return (
                            <Card
                                key={index}
                                className={[
                                    'group relative h-full overflow-hidden',
                                    'border border-border/60 bg-background shadow-sm',
                                    'transition-all duration-300',
                                    'hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl',
                                    'animate-in fade-in slide-in-from-bottom-8',
                                ].join(' ')}
                                style={{ animationDelay: `${index * 70}ms` }}
                            >
                                {/* ✅ Bloque superior con alturas fijas para alinear TODO */}
                                <div className="p-6">
                                    {/* Fila fija para icono + título (soporta 2 líneas) */}
                                    <div className="grid grid-cols-[48px_1fr] items-center gap-4">
                                        <div
                                            className={[
                                                'flex h-12 w-12 items-center justify-center rounded-lg shadow-sm',
                                                'transition-transform group-hover:scale-110',
                                                area.iconBg,
                                            ].join(' ')}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        {/* ✅ título centrado verticalmente respecto al icono */}
                                        <div className="flex h-[56px] items-center">
                                            <CardTitle className="line-clamp-2 text-2xl leading-snug font-bold">{area.title}</CardTitle>
                                        </div>
                                    </div>

                                    {/* ✅ Descripción SIEMPRE empieza igual y ocupa altura fija */}
                                    <div className="mt-6 h-[72px]">
                                        <CardDescription className="line-clamp-3 leading-relaxed text-muted-foreground">
                                            {area.description}
                                        </CardDescription>
                                    </div>
                                </div>

                                <div className="px-6">
                                    <div className="h-px w-full bg-border/60" />
                                </div>

                                <CardContent className="px-6 pt-2 pb-6">
                                    <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground/80 uppercase">Detalles clave:</h3>

                                    <ul className="space-y-4">
                                        {area.points.map((point, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <ArrowRight className={['mt-1 h-4 w-4 shrink-0', area.accentColor].join(' ')} />
                                                <span className="text-base leading-relaxed text-foreground/90">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        );
                    })}
                </section>
            </div>
        </AppLayout>
    );
}

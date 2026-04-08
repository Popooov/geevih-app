import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function Areas() {
    const areasData = [
        {
            title: 'Investigación',
            description: 'Liderazgo en proyectos científicos para el avance del conocimiento en cuidados de VIH.',
            accentColor: 'text-blue-600 dark:text-blue-400',
            accentBar: 'bg-blue-600 dark:bg-blue-400',
            points: [
                'Proyectos activos relacionados con VIH y enfermería.',
                'Publicaciones científicas en revistas de alto impacto.',
                'Colaboraciones estratégicas con entidades nacionales.',
            ],
        },
        {
            title: 'Formación',
            description: 'Garantizamos la excelencia profesional a través de recursos educativos y capacitación continua de nuestros miembros.',
            accentColor: 'text-green-600 dark:text-green-400',
            accentBar: 'bg-green-600 dark:bg-green-400',
            points: [
                'Cursos específicos para enfermería en el ámbito del VIH.',
                'Talleres y jornadas de actualización profesional.',
                'Elaboración de guías de buenas prácticas y protocolos.',
            ],
        },
        {
            title: 'Transferencia a la Comunidad',
            description: 'Fomentamos la prevención, la sensibilización y la difusión de información clave para la salud pública.',
            accentColor: 'text-purple-600 dark:text-purple-400',
            accentBar: 'bg-purple-600 dark:bg-purple-400',
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

            <div className="mx-auto max-w-6xl px-6 pt-6 pb-12 lg:px-8 lg:pt-12 lg:pb-14">
                <div className="space-y-12">
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/85 px-6 py-12 text-center backdrop-blur-xl sm:px-8 lg:px-12 lg:py-16 dark:bg-background/70">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.12),transparent_60%)]" />

                        <div className="relative mx-auto max-w-3xl">
                            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Sobre GEEVIH</p>

                            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
                                Áreas de Trabajo
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                                Estructuramos nuestro trabajo en tres líneas principales de acción para maximizar el impacto en la mejora de los
                                cuidados de enfermería en VIH.
                            </p>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {areasData.map((area, index) => (
                            <Card
                                key={index}
                                className={[
                                    'group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border-0 bg-white',
                                    'shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5',
                                    'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]',
                                    'dark:bg-neutral-900 dark:ring-white/10 dark:hover:bg-neutral-800',
                                    'animate-in fade-in slide-in-from-bottom-8 motion-reduce:transform-none motion-reduce:animate-none',
                                ].join(' ')}
                                style={{ animationDelay: `${index * 70}ms` }}
                            >
                                <div className={['h-[3px] w-full', area.accentBar].join(' ')} />

                                <div className="flex-1 p-6 pb-4 lg:p-7 lg:pb-5">
                                    <div className="space-y-4">
                                        <div className="flex min-h-[88px] items-start">
                                            <CardTitle className="text-[2rem] leading-tight font-bold tracking-tight text-foreground">
                                                {area.title}
                                            </CardTitle>
                                        </div>

                                        <div className="min-h-[96px]">
                                            <CardDescription className="text-[15px] leading-7 text-muted-foreground">
                                                {area.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="px-6 pt-0 pb-6 lg:px-7 lg:pb-7">
                                    <p className="mb-5 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Detalles clave</p>

                                    <ul className="space-y-5">
                                        {area.points.map((point, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <ArrowRight className={['mt-1 h-4 w-4 shrink-0', area.accentColor].join(' ')} />
                                                <span className="text-sm leading-7 text-foreground/90">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

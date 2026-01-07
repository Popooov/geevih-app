import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Briefcase, Mail, MapPin, User } from 'lucide-react';

export default function Equipo() {
    // Array de 11 miembros del equipo
    const teamMembers = [
        {
            id: 1,
            nombre: 'Dra. Elena Martínez',
            filiacion: 'Hospital Clínic, Barcelona',
            resumen:
                'Especialista en enfermedades infecciosas con más de 15 años de experiencia en el manejo clínico de pacientes con VIH y coinfecciones.',
            email: 'elena.mtz@geevih.es',
        },
        {
            id: 2,
            nombre: 'Dr. Carlos Ruiz',
            filiacion: 'Hospital La Paz, Madrid',
            resumen:
                'Investigador principal en múltiples ensayos clínicos internacionales centrados en nuevas terapias antirretrovirales y prevención.',
            email: 'carlos.ruiz@geevih.es',
        },
        {
            id: 3,
            nombre: 'Sra. Lucía Fernández',
            filiacion: 'Centro de Salud Isabel II, Sevilla',
            resumen: 'Enfermera experta en atención primaria y educación para la salud, dedicada al acompañamiento de pacientes crónicos.',
            email: 'lucia.f@geevih.es',
        },
        // Resto de los 8 miembros del equipo (generación para la estructura)
        ...Array.from({ length: 8 }, (_, i) => ({
            id: i + 4,
            nombre: `Vocal del Equipo ${i + 4}`,
            filiacion: 'Institución Sanitaria, España',
            resumen:
                'Profesional de la salud comprometido con la excelencia clínica y la mejora continua de los cuidados de enfermería en el ámbito del VIH.',
            email: `miembro${i + 4}@geevih.es`,
        })),
    ];

    return (
        <AppLayout>
            <Head title="Equipo | GEEVIH" />

            <div className="mx-auto max-w-5xl space-y-16 px-6 py-12">
                {/* Encabezado alineado con About.jsx */}
                <section className="space-y-6 text-center">
                    <div className="mb-4 flex justify-center">
                        <Link
                            href="/sobre"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver a Sobre GEEVIH
                        </Link>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                        Nuestro <span className="text-primary">Equipo</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
                        Conoce al equipo de profesionales expertos que lideran las iniciativas del Grupo de Enfermería Experта en VIH (GEEVIH).
                    </p>
                </section>

                {/* Cuadrícula del equipo */}
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {teamMembers.map((member, index) => (
                        <Card
                            key={member.id}
                            className="group transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 hover:-translate-y-2 hover:shadow-2xl"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Área de imagen */}
                            <div className="relative h-72 w-full rounded-xl bg-slate-100 dark:bg-slate-800">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <User className="h-24 w-24 text-slate-300 transition-transform duration-500 group-hover:scale-110 dark:text-slate-700" />
                                </div>

                                {/* Capa de superposición al pasar el ratón (Rojo) */}
                                <div className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Badge de correo electrónico */}
                                <div className="absolute right-4 bottom-4 left-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="flex items-center gap-2 rounded-xl bg-white/90 p-3 text-xs font-bold text-slate-800 shadow-lg backdrop-blur-sm dark:bg-slate-900/90 dark:text-slate-200">
                                        <Mail className="h-4 w-4 text-primary" />
                                        {member.email}
                                    </div>
                                </div>
                            </div>

                            <CardContent className="space-y-6 p-6">
                                <div className="space-y-2">
                                    <h3 className="text-xl leading-tight font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                                        {member.nombre}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm font-bold text-primary dark:text-red-400">
                                        <MapPin className="h-4 w-4 shrink-0" />
                                        <span className="truncate">{member.filiacion}</span>
                                    </div>
                                </div>

                                <div className="h-px w-full bg-slate-100 dark:bg-slate-800"></div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase dark:text-slate-500">
                                        <Briefcase className="h-3 w-3 text-primary/60" />
                                        Perfil Profesional
                                    </div>
                                    <p className="line-clamp-4 text-sm leading-relaxed font-medium text-slate-600 dark:text-slate-400">
                                        {member.resumen}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Bloque de pie de página (Rojo VIH) */}
                <div className="group relative mt-24 overflow-hidden rounded-[2rem] bg-primary p-12 text-center text-white shadow-2xl shadow-primary/20">
                    <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl transition-transform duration-1000 group-hover:scale-150"></div>

                    <h2 className="relative z-10 mb-4 text-3xl font-black">¿Tienes alguna propuesta?</h2>
                    <p className="relative z-10 mx-auto mb-8 max-w-xl text-lg font-light text-red-100">
                        Nuestro equipo está abierto a nuevas colaboraciones, proyectos de investigación y formación.
                    </p>
                    <a
                        href="mailto:info@geevih.es"
                        className="relative z-10 inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-black text-primary shadow-xl transition-all hover:scale-105 active:scale-95"
                    >
                        Contáctanos ahora
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}

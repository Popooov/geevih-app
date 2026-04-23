import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Building2, ExternalLink, FileText, Lock, Scale, Shield } from 'lucide-react';

function Section({
    id,
    title,
    icon: Icon,
    children,
}: {
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-24 rounded-[2rem] bg-background p-5 shadow-sm ring-1 ring-border/50 lg:p-8">
            <div className="mb-4 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                </div>

                <div>
                    <h2 className="font-headline text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{title}</h2>
                </div>
            </div>

            <div className="space-y-4 text-sm leading-7 text-muted-foreground">{children}</div>
        </section>
    );
}

export default function LegalNotice() {
    const sections = [
        { id: 'titularidad', label: 'Titularidad' },
        { id: 'uso', label: 'Uso del sitio' },
        { id: 'propiedad', label: 'Propiedad intelectual' },
        { id: 'enlaces', label: 'Enlaces externos' },
        { id: 'privacidad', label: 'Privacidad y datos' },
        { id: 'cookies', label: 'Cookies' },
        { id: 'legislacion', label: 'Legislación aplicable' },
    ];

    return (
        <AppLayout>
            <Head title="Aviso legal y privacidad | GEEVIH" />

            <div className="mx-auto max-w-5xl px-4 pt-4 pb-14 sm:px-6 lg:px-8 lg:pt-6 lg:pb-16">
                <div className="space-y-8">
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/85 px-5 py-7 backdrop-blur-xl sm:px-6 sm:py-8 lg:px-8 lg:py-10 dark:bg-background/70">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.14),transparent_60%)]" />

                        <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                    <FileText className="h-4 w-4" />
                                    Información legal
                                </div>

                                <div className="space-y-3">
                                    <h1 className="font-headline text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-5xl">
                                        Aviso legal y política de privacidad
                                    </h1>

                                    <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                                        En esta página se recogen las condiciones de uso del sitio web, la información sobre titularidad y los
                                        aspectos básicos relativos al tratamiento de datos personales en el entorno de GEEVIH y SEISIDA.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-[1.75rem] bg-muted/35 p-5 sm:p-6">
                                <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Accesos rápidos</p>

                                <div className="mt-4 grid gap-1.5">
                                    {sections.map((section) => (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                            className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-background hover:text-foreground"
                                        >
                                            {section.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <Section id="titularidad" title="1. Titularidad del sitio web" icon={Building2}>
                        <p>
                            El presente sitio web corresponde al Grupo de Enfermería Experta en VIH (GEEVIH), integrado en la Sociedad Española
                            Interdisciplinaria del Síndrome de Inmunodeficiencia Adquirida (SEISIDA).
                        </p>

                        <div className="rounded-[1.5rem] bg-muted/35 p-5">
                            <p className="font-medium text-foreground">Datos identificativos</p>
                            <div className="mt-3 space-y-1">
                                <p>SEISIDA</p>
                                <p>CIF G79176319</p>
                                <p>Glorieta de Quevedo, 9 – 5º, 28015 Madrid (España)</p>
                                <p>
                                    Correo electrónico:{' '}
                                    <a href="mailto:seisida@seisida.net" className="font-medium text-primary hover:underline">
                                        seisida@seisida.net
                                    </a>
                                </p>
                            </div>
                        </div>
                    </Section>

                    <Section id="uso" title="2. Uso del sitio web" icon={Scale}>
                        <p>
                            El acceso y uso de este sitio web implica la aceptación de las presentes condiciones. El usuario se compromete a utilizar
                            el sitio, sus contenidos y servicios de forma adecuada, de conformidad con la ley, la buena fe y el orden público.
                        </p>

                        <p>
                            Los contenidos ofrecidos en la web tienen carácter informativo. El acceso al sitio no implica, por sí mismo, el inicio de
                            una relación contractual o comercial con el titular.
                        </p>

                        <p>
                            El usuario se abstendrá de realizar actividades ilícitas, introducir código malicioso, intentar acceder a áreas
                            restringidas o utilizar el sitio de manera que pueda causar daños a GEEVIH, SEISIDA, sus proveedores o terceros.
                        </p>
                    </Section>

                    <Section id="propiedad" title="3. Propiedad intelectual e industrial" icon={Shield}>
                        <p>
                            Los contenidos del sitio web, incluyendo textos, imágenes, logotipos, diseño, estructura, código y demás elementos, son
                            titularidad de SEISIDA o se utilizan con la autorización correspondiente.
                        </p>

                        <p>
                            Queda prohibida la reproducción, distribución, comunicación pública o transformación de los contenidos sin autorización
                            previa y por escrito del titular, salvo en los casos permitidos por la legislación aplicable.
                        </p>
                    </Section>

                    <Section id="enlaces" title="4. Enlaces externos" icon={ExternalLink}>
                        <p>
                            Este sitio puede incluir enlaces a páginas, plataformas o servicios de terceros con la finalidad de facilitar información
                            adicional o el acceso a recursos externos.
                        </p>

                        <p>
                            SEISIDA no se responsabiliza de los contenidos, políticas, disponibilidad o condiciones de uso de esos sitios externos, ni
                            de los posibles daños o perjuicios derivados del acceso a ellos.
                        </p>
                    </Section>

                    <Section id="privacidad" title="5. Privacidad y protección de datos" icon={Lock}>
                        <p>
                            De conformidad con el Reglamento (UE) 2016/679 y la Ley Orgánica 3/2018, los datos personales facilitados a través de este
                            sitio serán tratados con la finalidad de atender consultas, gestionar comunicaciones y, en su caso, responder a
                            solicitudes relacionadas con la actividad del grupo.
                        </p>

                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="rounded-[1.5rem] bg-muted/35 p-5">
                                <p className="font-medium text-foreground">Responsable del tratamiento</p>
                                <p className="mt-2">
                                    SEISIDA, con domicilio en Glorieta de Quevedo, 9 – 5º, 28015 Madrid (España), y correo electrónico{' '}
                                    <a href="mailto:seisida@seisida.net" className="font-medium text-primary hover:underline">
                                        seisida@seisida.net
                                    </a>
                                    .
                                </p>
                            </div>

                            <div className="rounded-[1.5rem] bg-muted/35 p-5">
                                <p className="font-medium text-foreground">Finalidad del tratamiento</p>
                                <p className="mt-2">
                                    Gestión de consultas, comunicaciones con usuarios y mantenimiento básico del funcionamiento del sitio web.
                                </p>
                            </div>

                            <div className="rounded-[1.5rem] bg-muted/35 p-5">
                                <p className="font-medium text-foreground">Legitimación</p>
                                <p className="mt-2">
                                    Consentimiento del usuario y, en su caso, interés legítimo para la gestión técnica y de seguridad del sitio.
                                </p>
                            </div>

                            <div className="rounded-[1.5rem] bg-muted/35 p-5">
                                <p className="font-medium text-foreground">Conservación</p>
                                <p className="mt-2">
                                    Los datos se conservarán durante el tiempo necesario para atender la finalidad para la que fueron recabados y
                                    mientras puedan derivarse responsabilidades legales.
                                </p>
                            </div>
                        </div>

                        <p>
                            El usuario puede ejercitar sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y demás
                            derechos reconocidos por la normativa enviando una solicitud al correo electrónico indicado.
                        </p>

                        <p>Asimismo, puede obtener más información o presentar una reclamación ante la Agencia Española de Protección de Datos.</p>
                    </Section>

                    <Section id="cookies" title="6. Cookies" icon={FileText}>
                        <p>
                            Este sitio utiliza cookies técnicas y funcionales necesarias para su correcto funcionamiento. Puedes consultar la
                            información completa en la{' '}
                            <Link href="/politica-de-cookies" className="font-medium text-primary hover:underline">
                                Política de Cookies
                            </Link>
                            .
                        </p>
                    </Section>

                    <Section id="legislacion" title="7. Legislación aplicable y jurisdicción" icon={Scale}>
                        <p>
                            Las presentes condiciones se rigen por la legislación española. Para cualquier controversia que pudiera surgir en relación
                            con la interpretación o aplicación de este sitio web, las partes se someterán a los juzgados y tribunales que correspondan
                            conforme a la normativa aplicable.
                        </p>
                    </Section>
                </div>
            </div>
        </AppLayout>
    );
}

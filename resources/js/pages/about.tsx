import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'About',
        href: '/sobre',
    },
];

export default function About() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sobre" />
            <div className="mx-auto max-w-5xl space-y-10 p-6">
                {/* Título */}
                <h1 className="mt-6 lg:mt-8 text-center text-3xl font-bold">Sobre el GEEVIH</h1>

                <div className="my-8 overflow-hidden rounded-md">
                    <img
                        src="/images/EQUIPO-GEEVIH_n-800x579.jpg"
                        alt="Foto del equipo GEEVIH"
                        width={800}
                        height={600}
                        className="h-auto w-full rounded-md object-cover"
                    />
                </div>

                {/* Presentación */}
                <section className="space-y-4 leading-relaxed text-muted-foreground">
                    <p>
                        El Grupo de Enfermería Experta en VIH (GEEVIH), integrado en la Sociedad Española Interdisciplinaria del Sida (SEISIDA), surge
                        con el objetivo fundamental de dar soporte y potenciar la educación y la eficacia de la investigación en cuidados enfermeros,
                        promover la detección precoz y prevención de nuevos diagnósticos de VIH y de otras ITS, así como mejorar la calidad de vida de
                        las personas con VIH (PVIH) en todos los servicios de salud a lo largo del territorio español.
                    </p>
                </section>

                {/* Objetivos */}
                <section>
                    <h2 className="mb-2 text-2xl font-semibold">🎯 Objetivos del grupo</h2>
                    <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                        <li>Consolidar el liderazgo en el cuidado de personas con VIH.</li>
                        <li>Promover la formación continua y la investigación.</li>
                        <li>Sensibilizar a la comunidad sobre los cuidados de la enfermería en el ámbito del VIH.</li>
                    </ul>
                </section>

                {/* Principios del grupo */}
                <section>
                    <h2 className="mb-2 text-2xl font-semibold">💡 Principios</h2>
                    <p className="text-muted-foreground">
                        Cuidados de enfermería integrales, <strong>libres de estigma y discriminación</strong>, son principios básicos de GEEVIH. Todo
                        ello sin olvidar la <strong>investigación enfermera de excelencia</strong>, imprescindible para mejorar la atención y calidad
                        de vida de las PVIH.
                    </p>
                </section>

                {/* Integración en SEISIDA */}
                <section>
                    <h2 className="mb-2 text-2xl font-semibold">🤝 Integración en SEISIDA</h2>
                    <p className="text-muted-foreground">
                        Gracias a su integración en SEISIDA, el grupo cuenta con una plataforma colaborativa robusta para alcanzar sus objetivos en el
                        marco de la defensa de los derechos y la igualdad de acceso a servicios de calidad de las personas con VIH.
                    </p>
                </section>

                {/* Cita */}
                <section className="border-l-4 border-primary pl-4 text-muted-foreground italic">
                    “GEEVIH surge ante la necesidad de las enfermeras que trabajan en el ámbito del VIH de crear un espacio donde desarrollar
                    iniciativas que permitan alcanzar la excelencia en la práctica clínica, la investigación y la formación continua en la atención a
                    las personas que viven con VIH en todo el estado”, señalan desde el equipo de dirección.
                </section>

                {/* Misión */}
                <section>
                    <h2 className="mb-2 text-2xl font-semibold">🚀 Misión</h2>
                    <p className="text-muted-foreground">
                        GEEVIH nace con la misión de ser un referente en el ámbito de los cuidados a las PVIH en todos los servicios sanitarios del
                        territorio español, contribuyendo activamente en el diagnóstico precoz del VIH/ITS y en la mejora de la calidad de vida de las
                        personas que viven con el VIH a través de la excelencia enfermera en la práctica clínica, la investigación y la formación
                        continua.
                    </p>
                </section>
            </div>
        </AppLayout>
    );
}

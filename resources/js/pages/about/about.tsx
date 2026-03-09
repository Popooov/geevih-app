import MemberCard, { type Member } from '@/components/member-card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';

type PageProps = {
    members: Member[];
};

export default function SobreNosotros() {
    const { members } = usePage<PageProps>().props;

    return (
        <AppLayout>
            <Head title="Sobre Nosotros | GEEVIH" />

            <div className="mx-auto max-w-5xl space-y-16 px-6 py-12">
                {/* Header Section */}
                <section className="space-y-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">Sobre Nosotros</h1>

                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
                        GEEVIH es un grupo de profesionales de enfermería con experiencia en VIH que impulsa iniciativas de cuidado, investigación y
                        formación dentro del marco de SEISIDA
                    </p>
                </section>

                {/* Equipo (integrado dentro de Sobre Nosotros) */}
                <section className="space-y-8">
                    <header className="space-y-3 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">
                            Nuestro <span className="text-primary">Equipo</span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
                            Conoce al equipo de profesionales expertos que lideran las iniciativas del Grupo de Enfermería Experta en VIH (GEEVIH).
                        </p>
                    </header>

                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {(members ?? []).map((member, index) => (
                            <MemberCard key={member.id} member={member} index={index} />
                        ))}
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}

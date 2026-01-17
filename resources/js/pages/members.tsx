import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import MemberCard, { type Member } from '@/components/member-card';

type PageProps = {
    members: Member[];
};

export default function Equipo() {
    const { members } = usePage<PageProps>().props;

    return (
        <AppLayout>
            <Head title="Equipo | GEEVIH" />

            <div className="mx-auto max-w-5xl space-y-16 px-6 py-12">
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
                        Conoce al equipo de profesionales expertos que lideran las iniciativas del Grupo de Enfermería Experta en VIH (GEEVIH).
                    </p>
                </section>

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {members.map((member, index) => (
                        <MemberCard key={member.id} member={member} index={index} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

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

            <div className="mx-auto max-w-6xl px-6 pt-6 pb-12 lg:px-8 lg:pt-10 lg:pb-14">
                <div className="space-y-12">
                    {/* HERO */}
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/85 px-6 py-12 text-center backdrop-blur-xl sm:px-8 lg:px-12 lg:py-16 dark:bg-background/70">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.12),transparent_60%)]" />

                        <div className="relative mx-auto max-w-3xl">
                            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Sobre GEEVIH</p>

                            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
                                Sobre Nosotros
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                                GEEVIH es un grupo de profesionales de enfermería con experiencia en VIH que impulsa iniciativas de cuidado,
                                investigación y formación dentro del marco de SEISIDA.
                            </p>
                        </div>
                    </section>

                    {/* EQUIPO */}
                    <section className="space-y-6">
                        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Equipo</p>

                            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                Profesionales que impulsan GEEVIH
                            </h2>

                            <p className="mt-3 max-w-2xl text-base leading-8 text-muted-foreground">
                                Un equipo de profesionales con experiencia en VIH que lidera iniciativas de cuidado, formación e investigación dentro
                                del grupo.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {(members ?? []).map((member, index) => (
                                <MemberCard key={member.id} member={member} index={index} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

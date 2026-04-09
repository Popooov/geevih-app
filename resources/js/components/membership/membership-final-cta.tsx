import { Button } from '@/components/ui/button';

interface FinalCtaProps {
    typeformUrl: string;
}

export default function FinalCta({ typeformUrl }: FinalCtaProps) {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-4">
                <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#8f0d15_0%,#af101a_45%,#d32f2f_100%)] px-6 py-12 text-white shadow-[0_24px_60px_rgba(175,16,26,0.22)] sm:px-10 sm:py-14 lg:px-14">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute top-0 right-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
                    </div>

                    <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-sm font-medium tracking-[0.18em] text-white/80 uppercase">Únete a GEEVIH</p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                                Forma parte de una comunidad comprometida con la excelencia en los cuidados de enfermería en VIH
                            </h2>

                            <p className="mt-4 max-w-2xl text-base leading-8 text-white/85">
                                Accede al formulario de solicitud y da el siguiente paso para conectar con profesionales, compartir conocimiento y
                                participar en la actividad del grupo.
                            </p>
                        </div>

                        <div className="flex flex-col items-start gap-3">
                            <Button asChild className="h-11 rounded-xl bg-white px-6 text-[#af101a] hover:bg-white/95">
                                <a href={typeformUrl} target="_blank" rel="noopener noreferrer">
                                    Ir al formulario de solicitud
                                </a>
                            </Button>

                            <p className="text-sm text-white/75">El formulario se abrirá en una página externa.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

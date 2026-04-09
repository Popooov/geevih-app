import { Button } from '../ui/button';

interface HeroProps {
    typeformUrl: string;
}

export default function Hero({ typeformUrl }: HeroProps) {
    return (
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff_0%,#fff7f7_100%)]">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 right-[-80px] h-72 w-72 rounded-full bg-[#af101a]/8 blur-3xl" />
                <div className="absolute bottom-[-80px] left-[-60px] h-64 w-64 rounded-full bg-[#d32f2f]/8 blur-3xl" />
            </div>

            <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[minmax(0,1.2fr)_minmax(320px,420px)] md:items-center lg:py-28">
                <div>
                    <p className="text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase">Sobre GEEVIH</p>

                    <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                        Hazte socio de GEEVIH
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                        Forma parte de una comunidad profesional comprometida con la excelencia en los cuidados de enfermería en VIH, la formación
                        continua y la mejora de la práctica clínica.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button
                            asChild
                            className="h-11 rounded-xl bg-[linear-gradient(135deg,#af101a_0%,#d32f2f_100%)] px-6 text-white shadow-[0_12px_30px_rgba(175,16,26,0.18)] hover:opacity-95"
                        >
                            <a href={typeformUrl} target="_blank" rel="noopener noreferrer">
                                Ir al formulario
                            </a>
                        </Button>

                        <Button asChild variant="outline" className="h-11 rounded-xl border-slate-200 bg-white/80 px-6 text-slate-700 backdrop-blur">
                            <a href="#faq">Resolver dudas</a>
                        </Button>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
                        <div>
                            <span className="font-semibold text-slate-900">Red profesional</span>
                            <p className="mt-1">Conecta con profesionales del ámbito.</p>
                        </div>
                        <div>
                            <span className="font-semibold text-slate-900">Formación continua</span>
                            <p className="mt-1">Accede a actividades y recursos especializados.</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[2rem] bg-white/80 p-6 shadow-[0_20px_60px_rgba(175,16,26,0.08)] ring-1 ring-black/5 backdrop-blur md:p-8">
                    <div className="rounded-2xl bg-[#fff4f4] p-5">
                        <p className="text-xs font-semibold tracking-[0.18em] text-[#af101a] uppercase">Formar parte de GEEVIH</p>
                        <p className="mt-3 text-lg font-semibold text-slate-950">
                            Una comunidad para compartir conocimiento, impulsar el cuidado y avanzar juntos.
                        </p>
                    </div>

                    <div className="mt-5 space-y-3">
                        {[
                            'Intercambio entre profesionales',
                            'Participación en actividades del grupo',
                            'Acceso a recursos y contenidos de interés',
                            'Vinculación con iniciativas de SEISIDA',
                        ].map((item) => (
                            <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                {item}
                            </div>
                        ))}
                    </div>

                    <p className="mt-5 text-sm leading-7 text-slate-500">La solicitud se realiza a través de un formulario externo de Typeform.</p>
                </div>
            </div>
        </section>
    );
}

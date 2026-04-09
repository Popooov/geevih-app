import { Button } from '@/components/ui/button';

interface StepsProps {
    typeformUrl: string;
}

const steps = [
    {
        number: '01',
        title: 'Completa el formulario',
        text: 'Accede al formulario externo y envía tu solicitud de incorporación.',
    },
    {
        number: '02',
        title: 'Revisión de la solicitud',
        text: 'El equipo revisará la información enviada y valorará los siguientes pasos.',
    },
    {
        number: '03',
        title: 'Respuesta y seguimiento',
        text: 'Recibirás comunicación con la información necesaria para continuar el proceso.',
    },
];

export default function Steps({ typeformUrl }: StepsProps) {
    return (
        <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-medium tracking-[0.18em] text-slate-500 uppercase">Proceso</p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Cómo unirte</h2>
                    </div>

                    <Button
                        asChild
                        className="h-11 rounded-xl bg-[linear-gradient(135deg,#af101a_0%,#d32f2f_100%)] px-6 text-white shadow-[0_12px_30px_rgba(175,16,26,0.18)] hover:opacity-95"
                    >
                        <a href={typeformUrl} target="_blank" rel="noopener noreferrer">
                            Abrir formulario
                        </a>
                    </Button>
                </div>

                <div className="mt-10 grid gap-5 lg:grid-cols-3">
                    {steps.map((step) => (
                        <article key={step.number} className="rounded-[1.75rem] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                            <p className="text-3xl font-semibold tracking-tight text-[#af101a]">{step.number}</p>
                            <h3 className="mt-4 text-lg font-semibold text-slate-950">{step.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

const benefits = [
    {
        title: 'Acceso a conocimiento especializado',
        text: 'Recibe información, recursos y contenidos de interés para la práctica enfermera en VIH.',
    },
    {
        title: 'Formación continua',
        text: 'Mantente al día con actividades, jornadas y materiales formativos del grupo.',
    },
    {
        title: 'Red profesional',
        text: 'Conecta con profesionales del ámbito y comparte experiencias y buenas prácticas.',
    },
    {
        title: 'Participación en iniciativas',
        text: 'Colabora en proyectos, actividades o líneas de trabajo impulsadas por GEEVIH.',
    },
    {
        title: 'Actualización práctica y científica',
        text: 'Accede a información útil para una atención más actualizada y basada en la evidencia.',
    },
    {
        title: 'Vinculación con SEISIDA',
        text: 'Forma parte de un entorno profesional conectado con iniciativas y actividad científica relevante.',
    },
];

export default function Benefits() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-4">
                <p className="text-sm font-medium tracking-[0.18em] text-slate-500 uppercase">Beneficios</p>

                <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                    Motivos para formar parte de GEEVIH
                </h2>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {benefits.map((benefit, index) => (
                        <article
                            key={benefit.title}
                            className="rounded-[1.75rem] bg-slate-50 p-6 transition-transform duration-200 hover:-translate-y-0.5"
                        >
                            <div className="h-1.5 w-14 rounded-full bg-[linear-gradient(135deg,#af101a_0%,#d32f2f_100%)]" />
                            <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">Beneficio 0{index + 1}</p>
                            <h3 className="mt-3 text-lg font-semibold text-slate-950">{benefit.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600">{benefit.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

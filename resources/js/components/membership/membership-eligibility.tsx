export default function Eligibility() {
    const items = [
        'Profesionales de enfermería interesados en el ámbito del VIH.',
        'Profesionales vinculados al cuidado, la formación o la investigación.',
        'Personas interesadas en colaborar con el grupo y sus actividades.',
    ];

    return (
        <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-6xl px-4">
                <p className="text-sm font-medium tracking-[0.18em] text-slate-500 uppercase">Perfil</p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Quién puede solicitar su incorporación</h2>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {items.map((item, index) => (
                        <article key={item} className="rounded-[1.75rem] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                            <p className="text-xs font-semibold tracking-[0.18em] text-[#af101a] uppercase">0{index + 1}</p>
                            <p className="mt-4 text-base leading-8 text-slate-700">{item}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

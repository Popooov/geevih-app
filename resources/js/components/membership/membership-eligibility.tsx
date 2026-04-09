export default function Eligibility() {
    return (
        <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="text-2xl font-semibold text-slate-900">Quién puede hacerse socio</h2>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {[
                        'Profesionales de enfermería en el ámbito del VIH',
                        'Profesionales vinculados al cuidado, formación o investigación',
                        'Personas interesadas en colaborar con el grupo',
                    ].map((item) => (
                        <div key={item} className="rounded-2xl bg-white p-6 shadow-sm">
                            <p className="text-slate-700">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

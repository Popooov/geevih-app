export default function Intro() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Qué significa formar parte de GEEVIH</h2>

                    <p className="mt-6 text-slate-600">
                        GEEVIH es un grupo profesional centrado en el liderazgo enfermero en el ámbito del VIH, promoviendo la formación continua, la
                        investigación y la transferencia del conocimiento a la práctica clínica.
                    </p>
                </div>

                <div className="grid gap-4">
                    {[
                        'Red profesional especializada',
                        'Actualización científica continua',
                        'Participación en actividades',
                        'Compromiso con el cuidado en VIH',
                    ].map((item) => (
                        <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

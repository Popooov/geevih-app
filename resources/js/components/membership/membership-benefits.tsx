export default function Benefits() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="text-2xl font-semibold text-slate-900">Beneficios de ser socio</h2>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {[
                        'Acceso a recursos especializados',
                        'Participación en actividades formativas',
                        'Conexión con profesionales del ámbito',
                        'Colaboración en proyectos e iniciativas',
                        'Actualización científica continua',
                        'Vinculación con SEISIDA',
                    ].map((item) => (
                        <div key={item} className="rounded-2xl bg-slate-50 p-6">
                            <p className="text-slate-700">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

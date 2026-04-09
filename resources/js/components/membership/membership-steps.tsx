export default function Steps() {
    const steps = ['Consulta la información', 'Envía tu solicitud', 'Revisión por el equipo', 'Confirmación y siguientes pasos'];

    return (
        <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-4xl px-4">
                <h2 className="text-2xl font-semibold text-slate-900">Cómo asociarte</h2>

                <div className="mt-10 space-y-6">
                    {steps.map((step, i) => (
                        <div key={step} className="flex gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#af101a] text-sm text-white">{i + 1}</div>
                            <p className="text-slate-700">{step}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function Intro() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[minmax(0,1.1fr)_minmax(280px,360px)]">
                <div>
                    <p className="text-sm font-medium tracking-[0.18em] text-slate-500 uppercase">Por qué unirte</p>

                    <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                        Una comunidad profesional para compartir, aprender e impulsar cambios
                    </h2>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
                        Formar parte de GEEVIH significa conectar con profesionales implicados en el ámbito del VIH, compartir experiencias y
                        contribuir al avance de los cuidados enfermeros desde la evidencia, la formación y el compromiso con las personas.
                    </p>
                </div>

                <div className="space-y-4">
                    {[
                        {
                            title: 'Actualización científica',
                            text: 'Acceso a información y contenidos de interés para la práctica clínica.',
                        },
                        {
                            title: 'Intercambio profesional',
                            text: 'Una red para compartir experiencias, enfoques y buenas prácticas.',
                        },
                        {
                            title: 'Participación activa',
                            text: 'Colaboración en iniciativas, actividades y líneas de trabajo del grupo.',
                        },
                    ].map((item) => (
                        <div key={item.title} className="rounded-[1.75rem] bg-slate-50 p-6">
                            <h3 className="text-base font-semibold text-slate-950">{item.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

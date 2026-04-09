import { Button } from "../ui/button";

export default function Hero() {
    return (
        <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-6xl px-4">
                <p className="text-sm tracking-wide text-slate-500 uppercase">Sobre GEEVIH</p>

                <h1 className="mt-4 max-w-3xl text-4xl leading-tight font-semibold text-slate-900">Hazte socio de GEEVIH</h1>

                <p className="mt-6 max-w-2xl text-base text-slate-600">
                    Forma parte de una comunidad profesional comprometida con la excelencia en los cuidados de enfermería en VIH, la formación
                    continua y la mejora de la práctica clínica.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                    <Button className="bg-[#af101a] hover:bg-[#8f0d15]">Quiero asociarme</Button>

                    <Button variant="outline">Consultar requisitos</Button>
                </div>
            </div>
        </section>
    );
}

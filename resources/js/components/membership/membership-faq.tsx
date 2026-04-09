import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Faq() {
    return (
        <section id="faq" className="bg-white py-20">
            <div className="mx-auto max-w-4xl px-4">
                <p className="text-sm font-medium tracking-[0.18em] text-slate-500 uppercase">Preguntas frecuentes</p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                    Dudas habituales antes de solicitar tu incorporación
                </h2>

                <div className="mt-10 rounded-[2rem] bg-slate-50 p-3 sm:p-4">
                    <Accordion type="single" collapsible className="space-y-2">
                        <AccordionItem value="item-1" className="rounded-2xl bg-white px-5">
                            <AccordionTrigger className="text-left text-base font-medium text-slate-900">
                                ¿Quién puede solicitar su incorporación?
                            </AccordionTrigger>
                            <AccordionContent className="text-sm leading-7 text-slate-600">
                                Profesionales de enfermería y personas vinculadas al ámbito del VIH, los cuidados, la formación o la investigación,
                                así como personas interesadas en colaborar con el grupo.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="rounded-2xl bg-white px-5">
                            <AccordionTrigger className="text-left text-base font-medium text-slate-900">
                                ¿Cómo se realiza la solicitud?
                            </AccordionTrigger>
                            <AccordionContent className="text-sm leading-7 text-slate-600">
                                La solicitud se realiza a través de un formulario externo. Una vez enviado, el equipo revisará la información
                                recibida.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="rounded-2xl bg-white px-5">
                            <AccordionTrigger className="text-left text-base font-medium text-slate-900">
                                ¿Qué ocurre después de enviar el formulario?
                            </AccordionTrigger>
                            <AccordionContent className="text-sm leading-7 text-slate-600">
                                Tras la revisión, recibirás respuesta con la información necesaria y los siguientes pasos del proceso.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="rounded-2xl bg-white px-5">
                            <AccordionTrigger className="text-left text-base font-medium text-slate-900">
                                ¿Dónde puedo resolver otras dudas?
                            </AccordionTrigger>
                            <AccordionContent className="text-sm leading-7 text-slate-600">
                                Puedes utilizar los canales de contacto de GEEVIH para consultar cualquier cuestión relacionada con la incorporación o
                                la actividad del grupo.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </section>
    );
}

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQ() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-4xl px-4">
                <h2 className="text-2xl font-semibold text-slate-900">Preguntas frecuentes</h2>

                <div className="mt-8">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>¿Quién puede formar parte de GEEVIH?</AccordionTrigger>
                            <AccordionContent>Profesionales de enfermería y personas interesadas en el ámbito del VIH.</AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger>¿Cómo puedo solicitar la incorporación?</AccordionTrigger>
                            <AccordionContent>A través del formulario o contactando directamente con el grupo.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </section>
    );
}

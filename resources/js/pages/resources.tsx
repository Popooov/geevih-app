import ResourceCard from '@/components/ui/resource-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BookMarked, FileText, Landmark } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Resources',
        href: '/recursos',
    },
];

export default function Resources() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Recursos" />
            <div className="mx-auto max-w-6xl space-y-10 p-6">
                <h1 className="mt-6 lg:mt-8 text-center text-3xl font-bold">Recursos y Documentos</h1>

                <p className="text-muted-foreground">
                    Accede a guías clínicas, infografías educativas y documentos relevantes relacionados con el cuidado de las personas con VIH.
                </p>

                <Tabs defaultValue="guias" className="mt-6 w-full">
                    <TabsList className="no-scrollbar w-full justify-start gap-2 overflow-x-auto whitespace-nowrap sm:w-auto">
                        <TabsTrigger value="guias" className="flex items-center gap-2">
                            <BookMarked className="h-4 w-4" />
                            Guías
                        </TabsTrigger>
                        <TabsTrigger value="infografias" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Infografías
                        </TabsTrigger>
                        <TabsTrigger value="documentos" className="flex items-center gap-2">
                            <Landmark className="h-4 w-4" />
                            Documentos
                        </TabsTrigger>
                    </TabsList>

                    {/* Guías */}
                    <TabsContent value="guias" className="mt-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <ResourceCard titulo="Guía de cuidados en VIH" tipo="Guía" fecha="Marzo 2024" enlace="/docs/guia-cuidados-vih.pdf" />
                            <ResourceCard titulo="Protocolo ITS" tipo="Guía" fecha="Febrero 2024" enlace="/docs/protocolo-its.pdf" />
                        </div>
                    </TabsContent>

                    {/* Infografías */}
                    <TabsContent value="infografias" className="mt-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <ResourceCard
                                titulo="Prevención del estigma"
                                tipo="Infografía"
                                fecha="Enero 2024"
                                enlace="/docs/infografia-estigma.pdf"
                            />
                        </div>
                    </TabsContent>

                    {/* Documentos */}
                    <TabsContent value="documentos" className="mt-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <ResourceCard
                                titulo="Informe nacional sobre VIH"
                                tipo="Documento"
                                fecha="Diciembre 2023"
                                enlace="/docs/informe-vih.pdf"
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}

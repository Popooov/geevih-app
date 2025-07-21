import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ResourceCard from "@/components/ui/resource-card";
import { FileText, BookMarked, Landmark } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Resources',
        href: '/recursos',
    },
];

export default function Resources() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head />
      <main className="p-6 max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Recursos y Documentos</h1>

        <p className="text-muted-foreground">
          Accede a guías clínicas, infografías educativas y documentos
          relevantes relacionados con el cuidado de las personas con VIH.
        </p>

        <Tabs defaultValue="guias" className="w-full mt-6">
          <TabsList className="w-full overflow-x-auto no-scrollbar whitespace-nowrap sm:w-auto justify-start gap-2">
            <TabsTrigger value="guias" className="flex items-center gap-2">
              <BookMarked className="w-4 h-4" />
              Guías
            </TabsTrigger>
            <TabsTrigger
              value="infografias"
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Infografías
            </TabsTrigger>
            <TabsTrigger value="documentos" className="flex items-center gap-2">
              <Landmark className="w-4 h-4" />
              Documentos
            </TabsTrigger>
          </TabsList>

          {/* Guías */}
          <TabsContent value="guias" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ResourceCard
                titulo="Guía de cuidados en VIH"
                tipo="Guía"
                fecha="Marzo 2024"
                enlace="/docs/guia-cuidados-vih.pdf"
              />
              <ResourceCard
                titulo="Protocolo ITS"
                tipo="Guía"
                fecha="Febrero 2024"
                enlace="/docs/protocolo-its.pdf"
              />
            </div>
          </TabsContent>

          {/* Infografías */}
          <TabsContent value="infografias" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ResourceCard
                titulo="Informe nacional sobre VIH"
                tipo="Documento"
                fecha="Diciembre 2023"
                enlace="/docs/informe-vih.pdf"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </AppLayout>
  );
}

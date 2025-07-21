import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Mail, Send } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contacto',
        href: '/contacto',
    },
];

export default function Contact() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title='Contacto' />
      <div className="p-6 max-w-3xl mx-auto space-y-10">
        <h1 className="flex items-center gap-2 mt-6 lg:mt-8 text-center text-3xl font-bold">
          <Mail className="w-7 h-7 text-primary" />
          Contacto
        </h1>
        <p className="text-muted-foreground">
          Si deseas contactar con el Grupo de Enfermería Experta en VIH
          (GEEVIH), colaborar en alguna de nuestras iniciativas o resolver
          dudas, puedes escribirnos a:
        </p>

        <div className="border rounded-md p-4 bg-muted text-foreground">
          <p className="text-lg font-medium flex items-center gap-2">
            <Send className="w-5 h-5 text-primary" />
            <span>geevih@seisida.net</span>
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";
import { ExternalLink, Link as LinkIcon } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Enlaces",
    href: "/enlaces",
  },
];

export default function Links() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Enlaces" />
      <main className="p-6 max-w-4xl mx-auto space-y-10">
        <h1 className="flex items-center gap-2 mt-6 lg:mt-8 text-center text-3xl font-bold">
          <LinkIcon className="w-6 h-6 text-primary" />
          Enlaces de interés
        </h1>

        <ul className="space-y-4 text-muted-foreground">
          <li className="flex items-center gap-3">
            <ExternalLink className="w-4 h-4 text-primary" />
            <a
              href="https://www.seisida.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              SEISIDA – Sociedad Española Interdisciplinaria del Sida
            </a>
          </li>
          <li className="flex items-center gap-3">
            <ExternalLink className="w-4 h-4 text-primary" />
            <a
              href="https://www.mscbs.gob.es"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Ministerio de Sanidad – Estrategia del VIH y otras ITS
            </a>
          </li>
          <li className="flex items-center gap-3">
            <ExternalLink className="w-4 h-4 text-primary" />
            <a
              href="https://www.unaids.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              ONUSIDA – Programa Conjunto de las Naciones Unidas sobre el
              VIH/Sida
            </a>
          </li>
        </ul>
      </main>
    </AppLayout>
  );
}

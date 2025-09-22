import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { type ResourcesPageProps } from '@/types';
import ResourceCard from '@/components/resource-card';
import ResourceGrid from './_ResourceGrid';
import PaginationBar from '@/components/category-pagination';

export default function Herramientas() {
  const { props } = usePage<ResourcesPageProps>();
  const items = props.resources ?? [];
  const { current_page, last_page } = props.pagination ?? { current_page: 1, last_page: 1 };

  return (
    <AppLayout>
      <Head title="Herramientas Prácticas" />
      <div className="mx-auto w-full max-w-7xl px-4 py-6">
        <header className="mb-6">
          <h1 className="mt-6 text-center text-3xl font-bold lg:mt-8">Herramientas Prácticas</h1>
          <p className="mt-2 text-center text-muted-foreground">
            Calculadoras, checklists y plantillas para la práctica clínica diaria.
          </p>
        </header>

        <ResourceGrid>
          {items.map((r) => (
            <ResourceCard key={r.id} titulo={r.titulo} tipo={r.tipo} fecha={r.fecha} enlace={r.enlace} />
          ))}
        </ResourceGrid>

        <PaginationBar basePath="/recursos/herramientas" current={current_page} last={last_page} />
      </div>
    </AppLayout>
  );
}

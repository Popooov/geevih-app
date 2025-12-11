import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react'
import { type ResourcesPageProps } from '@/types'
import ResourceCard from '@/components/resource-card'
import ResourceGrid from './_ResourceGrid'
import CategoryPagination from '@/components/category-pagination'

export default function Guides() {
  const { resources = [], pagination = { current_page: 1, last_page: 1 } } =
    usePage<ResourcesPageProps>().props;

  const { current_page, last_page } = pagination;

  return (
    <AppLayout>
      <Head title="Guías y Protocolos" />
      <div className="mx-auto w-full max-w-7xl px-4 py-6">
        <header className="mb-6">
          <h1 className="mt-6 text-center text-3xl font-bold lg:mt-8">Guías y Protocolos</h1>
          <p className="mt-2 text-center text-muted-foreground">
            Compendio de guías clínicas y protocolos validados por GEEVIH.
          </p>
        </header>

        <ResourceGrid>
          {resources.map((r) => (
            <ResourceCard
              key={r.id}
              titulo={r.titulo}
              tipo={r.tipo}
              fecha={r.fecha}
              imagen={r.imagen}
              enlace={r.enlace ?? null}
            />
          ))}
        </ResourceGrid>

        <CategoryPagination basePath="/recursos/guias" current={current_page} last={last_page} />
      </div>
    </AppLayout>
  )
}

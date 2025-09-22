// resources/js/components/category-pagination.tsx
import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from '@/components/ui/pagination'
import { Link, usePage } from '@inertiajs/react'

function makePages(current: number, last: number): (number | '...')[] {
  const out: (number | '...')[] = []
  const push = (v: number | '...') => out.push(v)
  if (last <= 7) { for (let i = 1; i <= last; i++) push(i); return out }
  push(1); if (current > 4) push('...')
  const start = Math.max(2, current - 1)
  const end = Math.min(last - 1, current + 1)
  for (let i = start; i <= end; i++) push(i)
  if (current < last - 3) push('...')
  push(last); return out
}

function buildHref(basePath: string, page: number, searchParams: URLSearchParams) {
  const params = new URLSearchParams(searchParams)
  params.set('page', String(page))
  const qs = params.toString()
  return `${basePath}${qs ? `?${qs}` : ''}`
}

export default function CategoryPagination({
  basePath,
  current,
  last,
  preserveScroll = true,
}: {
  basePath: string
  current: number
  last: number
  preserveScroll?: boolean
}) {
  // 👇 Hook SIEMPRE arriba del componente, nunca después de returns o dentro de condicionales
  const { url } = usePage()
  const searchIndex = url.indexOf('?')
  const searchParams = new URLSearchParams(searchIndex >= 0 ? url.slice(searchIndex + 1) : '')

  if (last <= 1) return null

  const pages = makePages(current, last)
  const hasPrev = current > 1
  const hasNext = current < last

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          {hasPrev ? (
            <PaginationPrevious asChild aria-label="Página anterior">
              <Link href={buildHref(basePath, current - 1, searchParams)} preserveScroll={preserveScroll}>
                Anterior
              </Link>
            </PaginationPrevious>
          ) : (
            <span className="pointer-events-none select-none opacity-50 px-3 py-2 text-sm">Anterior</span>
          )}
        </PaginationItem>

        {pages.map((p, i) =>
          p === '...' ? (
            <PaginationItem key={`e-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink asChild isActive={p === current} aria-current={p === current ? 'page' : undefined}>
                <Link href={buildHref(basePath, p, searchParams)} preserveScroll={preserveScroll}>
                  {p}
                </Link>
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          {hasNext ? (
            <PaginationNext asChild aria-label="Página siguiente">
              <Link href={buildHref(basePath, current + 1, searchParams)} preserveScroll={preserveScroll}>
                Siguiente
              </Link>
            </PaginationNext>
          ) : (
            <span className="pointer-events-none select-none opacity-50 px-3 py-2 text-sm">Siguiente</span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

import { Link, usePage } from '@inertiajs/react';

function makePages(current: number, last: number): (number | '...')[] {
    const out: (number | '...')[] = [];
    const push = (v: number | '...') => out.push(v);
    if (last <= 7) {
        for (let i = 1; i <= last; i++) push(i);
        return out;
    }
    push(1);
    if (current > 4) push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(last - 1, current + 1);
    for (let i = start; i <= end; i++) push(i);
    if (current < last - 3) push('...');
    push(last);
    return out;
}

function buildHref(basePath: string, page: number, searchParams: URLSearchParams) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    const qs = params.toString();
    return `${basePath}${qs ? `?${qs}` : ''}`;
}

export default function CategoryPagination({
    basePath,
    current,
    last,
    preserveScroll = true,
}: {
    basePath: string;
    current: number;
    last: number;
    preserveScroll?: boolean;
}) {
    const { url } = usePage();
    const searchIndex = url.indexOf('?');
    const searchParams = new URLSearchParams(searchIndex >= 0 ? url.slice(searchIndex + 1) : '');

    if (last <= 1) return null;

    const pages = makePages(current, last);
    const hasPrev = current > 1;
    const hasNext = current < last;

    return (
        <nav aria-label="pagination" className="mt-8 flex justify-center">
            <ul className="inline-flex items-center gap-2">
                {/* Previous */}
                <li>
                    {hasPrev ? (
                        <Link
                            href={buildHref(basePath, current - 1, searchParams)}
                            preserveScroll={preserveScroll}
                            className="inline-flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-muted"
                        >
                            Anterior
                        </Link>
                    ) : (
                        <span className="pointer-events-none px-3 py-2 text-sm opacity-50 select-none">Anterior</span>
                    )}
                </li>

                {/* Pages */}
                {pages.map((p, i) =>
                    p === '...' ? (
                        <li key={`e-${i}`} className="px-2 py-1 text-sm text-muted-foreground">
                            …
                        </li>
                    ) : (
                        <li key={p}>
                            {p === current ? (
                                <span
                                    aria-current="page"
                                    className="inline-flex items-center justify-center rounded bg-primary px-3 py-2 text-sm font-medium whitespace-nowrap text-white"
                                >
                                    {p}
                                </span>
                            ) : (
                                <Link
                                    href={buildHref(basePath, p as number, searchParams)}
                                    preserveScroll={preserveScroll}
                                    className="inline-flex items-center justify-center rounded px-3 py-2 text-sm whitespace-nowrap hover:bg-muted"
                                >
                                    {p}
                                </Link>
                            )}
                        </li>
                    ),
                )}

                {/* Next */}
                <li>
                    {hasNext ? (
                        <Link
                            href={buildHref(basePath, current + 1, searchParams)}
                            preserveScroll={preserveScroll}
                            className="inline-flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-muted"
                        >
                            Siguiente
                        </Link>
                    ) : (
                        <span className="pointer-events-none px-3 py-2 text-sm opacity-50 select-none">Siguiente</span>
                    )}
                </li>
            </ul>
        </nav>
    );
}

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

    const itemBaseClass =
        'inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none';

    const linkClass = 'text-muted-foreground hover:bg-muted hover:text-foreground';

    const activeClass = 'bg-primary text-primary-foreground shadow-sm';

    const disabledClass = 'pointer-events-none text-muted-foreground/45 select-none dark:text-zinc-600';

    return (
        <nav aria-label="Paginación" className="mt-10 flex justify-center">
            <ul className="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-card p-2">
                {/* Previous */}
                <li>
                    {hasPrev ? (
                        <Link
                            href={buildHref(basePath, current - 1, searchParams)}
                            preserveScroll={preserveScroll}
                            className={`${itemBaseClass} min-w-fit px-3.5 ${linkClass}`}
                        >
                            Anterior
                        </Link>
                    ) : (
                        <span className={`${itemBaseClass} min-w-fit px-3.5 ${disabledClass}`}>Anterior</span>
                    )}
                </li>

                {/* Pages */}
                {pages.map((p, i) =>
                    p === '...' ? (
                        <li key={`e-${i}`} className="flex h-10 min-w-8 items-center justify-center px-1 text-sm text-muted-foreground">
                            …
                        </li>
                    ) : (
                        <li key={p}>
                            {p === current ? (
                                <span aria-current="page" className={`${itemBaseClass} ${activeClass}`}>
                                    {p}
                                </span>
                            ) : (
                                <Link
                                    href={buildHref(basePath, p as number, searchParams)}
                                    preserveScroll={preserveScroll}
                                    className={`${itemBaseClass} ${linkClass}`}
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
                            className={`${itemBaseClass} min-w-fit px-3.5 ${linkClass}`}
                        >
                            Siguiente
                        </Link>
                    ) : (
                        <span className={`${itemBaseClass} min-w-fit px-3.5 ${disabledClass}`}>Siguiente</span>
                    )}
                </li>
            </ul>
        </nav>
    );
}

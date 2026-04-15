import { Link, usePage } from '@inertiajs/react';

function makePages(current: number, last: number): (number | '...')[] {
    const out: (number | '...')[] = [];
    const push = (value: number | '...') => out.push(value);

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
        <nav aria-label="Paginación" className="mt-8 flex justify-center">
            <ul className="inline-flex flex-wrap items-center gap-2">
                <li>
                    {hasPrev ? (
                        <Link
                            href={buildHref(basePath, current - 1, searchParams)}
                            preserveScroll={preserveScroll}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-3 py-2 text-sm text-foreground transition hover:bg-muted dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
                        >
                            Anterior
                        </Link>
                    ) : (
                        <span className="pointer-events-none px-3 py-2 text-sm opacity-50 select-none">Anterior</span>
                    )}
                </li>

                {pages.map((page, index) =>
                    page === '...' ? (
                        <li key={`ellipsis-${index}`} className="px-2 py-1 text-sm text-muted-foreground dark:text-zinc-500">
                            …
                        </li>
                    ) : (
                        <li key={page}>
                            {page === current ? (
                                <span
                                    aria-current="page"
                                    className="inline-flex min-w-10 items-center justify-center rounded-xl bg-zinc-950 px-3 py-2 text-sm font-medium whitespace-nowrap text-white dark:bg-white dark:text-zinc-950"
                                >
                                    {page}
                                </span>
                            ) : (
                                <Link
                                    href={buildHref(basePath, page, searchParams)}
                                    preserveScroll={preserveScroll}
                                    className="inline-flex min-w-10 cursor-pointer items-center justify-center rounded-xl bg-background px-3 py-2 text-sm whitespace-nowrap text-foreground transition hover:bg-muted dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
                                >
                                    {page}
                                </Link>
                            )}
                        </li>
                    ),
                )}

                <li>
                    {hasNext ? (
                        <Link
                            href={buildHref(basePath, current + 1, searchParams)}
                            preserveScroll={preserveScroll}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-3 py-2 text-sm text-foreground transition hover:bg-muted dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
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

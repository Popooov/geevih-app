import LinkCard from '@/components/link-card';
import AppLayout from '@/layouts/app-layout';
import { type Resource, type ResourcesPageProps } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const LINKS_PATH = '/recursos/enlaces';

// El backend ahora devuelve `pinned` y `resources` (solo no-pinned) por separado.
// `pagination` refleja únicamente los no-pinned, por lo que el total excluye los pinned.
interface LinksPageProps extends ResourcesPageProps {
    pinned: Resource[];
}

export default function Links() {
    const { pinned = [], resources = [], pagination } = usePage<LinksPageProps>().props;

    const [others, setOthers] = useState<Resource[]>(resources);
    const [currentPage, setCurrentPage] = useState(pagination?.current_page ?? 1);
    const [isLoading, setIsLoading] = useState(false);

    const lastPage = pagination?.last_page ?? 1;
    const total = pagination?.total ?? others.length;
    const hasMore = currentPage < lastPage;

    const didMount = useRef(false);

    // Al montar: si la URL tiene ?page=X redirigir a la raíz con hard redirect
    // para evitar el error "Cannot read properties of undefined (reading 'version')"
    // que ocurre al llamar router.get antes de que Inertia esté inicializado.
    useEffect(() => {
        if (didMount.current) return;
        didMount.current = true;

        const pageParam = Number(new URLSearchParams(window.location.search).get('page') ?? 1);

        if (pageParam > 1) {
            window.location.replace(LINKS_PATH);
        }
    }, []);

    function loadMore() {
        if (!hasMore || isLoading) return;

        setIsLoading(true);

        router.get(
            LINKS_PATH,
            { page: currentPage + 1 },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                only: ['resources', 'pagination'],
                onSuccess: (page) => {
                    const incoming = (page.props.resources ?? []) as Resource[];
                    const newPagination = page.props.pagination as ResourcesPageProps['pagination'] | undefined;

                    setOthers((prev) => {
                        const ids = new Set(prev.map((r) => r.id));
                        return [...prev, ...incoming.filter((r) => !ids.has(r.id))];
                    });

                    setCurrentPage(newPagination?.current_page ?? currentPage + 1);

                    window.setTimeout(() => {
                        window.history.replaceState(window.history.state, '', LINKS_PATH);
                    }, 0);
                },
                onFinish: () => setIsLoading(false),
            },
        );
    }

    return (
        <AppLayout>
            <Head title="Enlaces de Interés | GEEVIH" />

            <div className="mx-auto max-w-6xl px-6 pt-6 pb-12 lg:px-8 lg:pt-10 lg:pb-14">
                <div className="space-y-14">
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/85 px-6 py-12 text-center backdrop-blur-xl dark:bg-background/70">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.12),transparent_60%)]" />

                        <div className="relative mx-auto max-w-3xl">
                            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Recursos GEEVIH</p>

                            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
                                Enlaces de Interés
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                                Accede a portales oficiales, sociedades científicas y entidades de referencia nacional e internacional en el ámbito
                                del VIH.
                            </p>
                        </div>
                    </section>

                    {pinned.length > 0 ? (
                        <section className="space-y-6">
                            <div className="text-center">
                                <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">Selección destacada</p>
                                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Enlaces recomendados</h2>
                            </div>

                            <div className="space-y-6">
                                {pinned.map((r) => (
                                    <LinkCard
                                        key={r.id}
                                        href={r.enlace ?? '#'}
                                        titulo={r.titulo}
                                        descripcion={r.descripcion}
                                        imagen={r.imagen}
                                        is_pinned
                                    />
                                ))}
                            </div>
                        </section>
                    ) : null}

                    <section className="space-y-6">
                        {pinned.length > 0 ? (
                            <div className="text-center">
                                <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Todos los enlaces</p>
                                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Directorio completo</h2>
                            </div>
                        ) : null}

                        <div className="space-y-6">
                            {others.map((r) => (
                                <LinkCard
                                    key={r.id}
                                    href={r.enlace ?? '#'}
                                    titulo={r.titulo}
                                    descripcion={r.descripcion}
                                    imagen={r.imagen}
                                    is_pinned={r.is_pinned}
                                />
                            ))}
                        </div>

                        {(pinned.length > 0 || others.length > 0) ? (
                            <div className="flex flex-col items-center gap-4 pt-4 text-center">
                                <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                                    Mostrando {others.length} de {total} enlaces
                                </p>

                                {hasMore ? (
                                    <button
                                        type="button"
                                        onClick={loadMore}
                                        disabled={isLoading}
                                        className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(175,16,26,0.18)] transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-[0_18px_45px_rgba(175,16,26,0.22)]"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Cargando enlaces...
                                            </>
                                        ) : (
                                            <>Cargar más enlaces</>
                                        )}
                                    </button>
                                ) : null}
                            </div>
                        ) : null}
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

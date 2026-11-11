import { ShareButton } from '@/components/share-button';
import { siteButtonVariants } from '@/components/site-button';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type ShowNewsPageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';

const fallbackImageSrc = '/images/news-placeholder.png';
const textLinkClassName =
    'inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none motion-reduce:transition-none';

export default function Show() {
    const { singleNews } = usePage<ShowNewsPageProps>().props;

    const content = singleNews.contenido?.trim();
    const summary = singleNews.descripcion?.trim();
    const imageSrc = singleNews.imagen?.trim();
    const sourceUrl = singleNews.source_url?.trim();

    const backLink = (
        <Link href="/noticias" prefetch className={cn(textLinkClassName, 'text-muted-foreground hover:text-primary')}>
            <ArrowLeft aria-hidden="true" className="size-4 shrink-0" />
            Volver a noticias
        </Link>
    );

    const sourceLink = sourceUrl && (
        <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={
                content
                    ? cn(textLinkClassName, 'text-primary underline underline-offset-4 hover:text-primary/80')
                    : cn(siteButtonVariants({ variant: 'primary' }), 'w-full sm:w-auto')
            }
        >
            Ver fuente original
            <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
    );

    return (
        <AppLayout>
            <Head title={singleNews.titulo} />

            <div className="site-page">
                <div className="mx-auto max-w-3xl space-y-4 lg:pt-8">
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                        {backLink}
                        {singleNews.link && <ShareButton key={singleNews.link} title={singleNews.titulo} url={singleNews.link} />}
                    </div>

                    <article aria-labelledby="news-title" className="space-y-6 sm:space-y-8">
                        <header className="space-y-3 sm:space-y-4">
                            {singleNews.fecha && (
                                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar aria-hidden="true" className="size-4 shrink-0" />
                                    {singleNews.fecha}
                                </p>
                            )}

                            <h1
                                id="news-title"
                                className="text-[1.625rem] leading-[1.15] font-semibold tracking-tight text-pretty [overflow-wrap:anywhere] text-foreground sm:text-3xl lg:text-[2.5rem]"
                            >
                                {singleNews.titulo}
                            </h1>

                            {summary && (
                                <p
                                    className={cn(
                                        'max-w-[68ch] text-[1.0625rem] leading-[1.7] [overflow-wrap:anywhere] whitespace-pre-line sm:text-lg',
                                        content ? 'text-foreground/80' : 'text-foreground',
                                    )}
                                >
                                    {summary}
                                </p>
                            )}

                            {!content && sourceLink}
                        </header>

                        {imageSrc && (
                            <figure className={content ? undefined : 'max-w-xl'}>
                                <img
                                    src={imageSrc}
                                    alt={singleNews.image_alt?.trim() || singleNews.titulo}
                                    decoding="async"
                                    className={cn('h-auto max-w-full rounded-xl bg-muted object-contain', content ? 'max-h-[28rem]' : 'max-h-96')}
                                    onError={({ currentTarget }) => {
                                        if (currentTarget.getAttribute('src') !== fallbackImageSrc) {
                                            currentTarget.alt = '';
                                            currentTarget.src = fallbackImageSrc;
                                        }
                                    }}
                                />
                            </figure>
                        )}

                        {content && (
                            <>
                                <div
                                    className="prose max-w-[68ch] text-[1.0625rem] leading-[1.7] [overflow-wrap:anywhere] text-foreground sm:text-lg dark:prose-invert prose-headings:text-foreground prose-a:text-primary prose-a:underline-offset-4"
                                    dangerouslySetInnerHTML={{ __html: content }}
                                />

                                <footer className="flex flex-wrap items-center gap-x-6 gap-y-1">
                                    {sourceLink}
                                    {backLink}
                                </footer>
                            </>
                        )}
                    </article>
                </div>
            </div>
        </AppLayout>
    );
}

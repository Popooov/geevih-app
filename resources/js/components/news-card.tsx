import { siteButtonVariants } from '@/components/site-button';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar } from 'lucide-react';

interface NoticiaCardProps {
    titulo: string;
    fecha: string;
    resumen: string;
    imagen?: string | null;
    enlace?: string | null;
}

const fallbackImageSrc = '/images/news-placeholder.png';

export default function NewsCard({ titulo, fecha, resumen, imagen, enlace }: NoticiaCardProps) {
    const imageSrc = imagen?.trim() || fallbackImageSrc;
    const href = enlace?.trim();
    const available = Boolean(href && href !== '#');
    const card = (
        <article className={'site-card' + (available ? ' site-card-interactive' : '')}>
            <div className="aspect-video overflow-hidden bg-muted">
                <img
                    src={imageSrc}
                    alt={titulo}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                    onError={({ currentTarget }) => {
                        if (currentTarget.getAttribute('src') !== fallbackImageSrc) {
                            currentTarget.src = fallbackImageSrc;
                        }
                    }}
                />
            </div>
            <div className="site-card-body">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar aria-hidden="true" className="h-4 w-4 shrink-0" />
                    {fecha}
                </p>
                <h3 className="mt-4 line-clamp-3 site-card-title">{titulo}</h3>
                {resumen && <p className="mt-3 line-clamp-3 site-card-description">{resumen}</p>}
                {available && (
                    <div className="site-card-footer">
                        <span className={siteButtonVariants({ variant: 'secondary' })}>
                            Leer noticia
                            <ArrowRight aria-hidden="true" />
                        </span>
                    </div>
                )}
            </div>
        </article>
    );

    return available && href ? (
        <Link href={href} className="site-card-link">
            {card}
        </Link>
    ) : (
        card
    );
}

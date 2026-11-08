import { siteButtonVariants } from '@/components/site-button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Briefcase, Globe, Linkedin, Mail } from 'lucide-react';

export interface Member {
    id: number;
    name: string;
    role?: string | null;
    affiliation?: string | null;
    summary?: string | null;
    bio?: string | null;
    email?: string | null;
    photo_url?: string | null;
    photo_alt?: string | null;
    website_url?: string | null;
    linkedin_url?: string | null;
    sort_order?: number;
    is_published?: boolean;
}

interface MemberCardProps {
    member: Member;
    index?: number;
    priority?: boolean;
}

export default function MemberCard({ member, priority = false }: MemberCardProps) {
    const src = member.photo_url?.trim() ? member.photo_url : '/images/member-placeholder.svg';
    const alt = member.photo_alt?.trim() ? member.photo_alt : `Foto de ${member.name}`;

    const hasBio = Boolean(member.bio?.trim());
    const hasLinks = Boolean(member.website_url?.trim() || member.linkedin_url?.trim());

    const actionPillClass = siteButtonVariants({ variant: 'secondary' });

    return (
        <Card>
            <div className="relative h-72 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                    src={src}
                    alt={alt}
                    width={640}
                    height={640}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover"
                    loading={priority ? 'eager' : 'lazy'}
                    fetchPriority={priority ? 'high' : 'auto'}
                    decoding="async"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/member-placeholder.svg';
                    }}
                />

                {member.email ? (
                    <div className="absolute right-4 bottom-4 left-4">
                        <a
                            href={`mailto:${member.email}`}
                            className="flex min-h-11 items-center gap-2 rounded-xl bg-card/95 px-3 py-3 text-sm text-card-foreground shadow-sm backdrop-blur-sm hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Mail className="h-4 w-4 text-primary" />
                            <span className="truncate">{member.email}</span>
                        </a>
                    </div>
                ) : null}
            </div>

            <CardContent className="site-card-body">
                <div className="space-y-5">
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <h3 className="site-card-title">{member.name}</h3>

                            {member.role ? (
                                <div className="flex items-start gap-2 text-sm font-medium text-muted-foreground">
                                    <Briefcase className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span className="line-clamp-2">{member.role}</span>
                                </div>
                            ) : null}

                            {member.affiliation ? <p className="text-sm leading-6 font-medium text-primary/90">{member.affiliation}</p> : null}
                        </div>

                        {member.summary ? <p className="site-card-description">{member.summary}</p> : null}
                    </div>
                </div>

                <div className="mt-auto flex flex-col items-start gap-3 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                    {hasBio ? (
                        <Dialog>
                            <DialogTrigger asChild>
                                <button type="button" className={actionPillClass}>
                                    Leer biografía
                                </button>
                            </DialogTrigger>

                            <DialogContent className="max-h-[85dvh] w-[calc(100vw-1.5rem)] max-w-2xl overflow-hidden p-0 sm:w-full">
                                <div className="flex max-h-[85dvh] flex-col">
                                    <div className="border-b border-border/70 p-5 sm:p-6">
                                        <DialogHeader className="space-y-1 pr-10 text-left">
                                            <DialogTitle className="text-2xl font-extrabold text-foreground">{member.name}</DialogTitle>

                                            <div className="space-y-1 pt-1">
                                                {member.role ? (
                                                    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                                        <Briefcase className="h-4 w-4" />
                                                        <span>{member.role}</span>
                                                    </div>
                                                ) : null}

                                                {member.affiliation ? (
                                                    <div className="text-sm font-semibold text-muted-foreground">{member.affiliation}</div>
                                                ) : null}
                                            </div>

                                            {member.email || member.website_url || member.linkedin_url ? (
                                                <div className="flex flex-wrap items-center gap-2 pt-3">
                                                    {member.email ? (
                                                        <a href={`mailto:${member.email}`} className={actionPillClass}>
                                                            <Mail className="h-3.5 w-3.5" />
                                                            {member.email}
                                                        </a>
                                                    ) : null}

                                                    {member.website_url?.trim() ? (
                                                        <a
                                                            href={member.website_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={actionPillClass}
                                                        >
                                                            <Globe className="h-3.5 w-3.5" />
                                                            Web
                                                        </a>
                                                    ) : null}

                                                    {member.linkedin_url?.trim() ? (
                                                        <a
                                                            href={member.linkedin_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={actionPillClass}
                                                        >
                                                            <Linkedin className="h-3.5 w-3.5" />
                                                            LinkedIn
                                                        </a>
                                                    ) : null}
                                                </div>
                                            ) : null}
                                        </DialogHeader>
                                    </div>

                                    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6">
                                        {member.summary ? (
                                            <p className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">{member.summary}</p>
                                        ) : null}

                                        <div className="prose max-w-none prose-slate dark:prose-invert">
                                            <div dangerouslySetInnerHTML={{ __html: member.bio || '' }} />
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ) : (
                        <span className="text-xs font-semibold text-muted-foreground">Sin bio</span>
                    )}

                    {hasLinks ? (
                        <div className="flex flex-wrap items-center gap-2">
                            {member.website_url?.trim() ? (
                                <a
                                    href={member.website_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={actionPillClass}
                                    onClick={(e) => e.stopPropagation()}
                                    aria-label={`Abrir web de ${member.name}`}
                                >
                                    <Globe className="h-3.5 w-3.5" />
                                    Web
                                </a>
                            ) : null}

                            {member.linkedin_url?.trim() ? (
                                <a
                                    href={member.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={actionPillClass}
                                    onClick={(e) => e.stopPropagation()}
                                    aria-label={`Abrir LinkedIn de ${member.name}`}
                                >
                                    <Linkedin className="h-3.5 w-3.5" />
                                    LinkedIn
                                </a>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </CardContent>
        </Card>
    );
}

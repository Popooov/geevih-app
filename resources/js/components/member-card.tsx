import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Briefcase, Globe, Linkedin, Mail, MapPin } from 'lucide-react';

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
}

export default function MemberCard({ member, index = 0 }: MemberCardProps) {
    const src = member.photo_url?.trim() ? member.photo_url : '/images/member-placeholder.svg';
    const alt = member.photo_alt?.trim() ? member.photo_alt : `Foto de ${member.name}`;

    const hasBio = Boolean(member.bio?.trim());
    const hasLinks = Boolean(member.website_url?.trim() || member.linkedin_url?.trim());

    return (
        <Card
            className={[
                'group overflow-hidden rounded-xl border border-border/70 bg-background shadow-sm transition-all duration-500',
                'animate-in fade-in slide-in-from-bottom-8 motion-reduce:transform-none motion-reduce:animate-none',
                'hover:-translate-y-2 hover:border-red-600/40 hover:shadow-2xl hover:shadow-red-500/10 dark:hover:border-red-400/30',
            ].join(' ')}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            {/* Imagen */}
            <div className="relative h-72 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/member-placeholder.svg';
                    }}
                />

                {/* Badge email (hover) */}
                {member.email ? (
                    <div className="absolute right-4 bottom-4 left-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 rounded-xl bg-white/90 p-3 text-xs font-bold text-slate-800 shadow-lg backdrop-blur-sm transition hover:text-red-600 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:text-red-400"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Mail className="h-4 w-4 text-red-600 dark:text-red-400" />
                            <span className="truncate">{member.email}</span>
                        </a>
                    </div>
                ) : null}
            </div>

            <CardContent className="space-y-5 p-6">
                {/* Header */}
                <div className="space-y-2">
                    <h3 className="text-xl leading-tight font-bold text-foreground transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-400">
                        {member.name}
                    </h3>

                    {member.role ? (
                        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                            <Briefcase className="h-4 w-4 shrink-0" />
                            <span className="line-clamp-1">{member.role}</span>
                        </div>
                    ) : null}

                    {member.affiliation ? (
                        <div className="flex items-center gap-2 text-sm font-semibold text-primary transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-400">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span className="line-clamp-1">{member.affiliation}</span>
                        </div>
                    ) : null}
                </div>

                <div className="h-px w-full bg-slate-100 dark:bg-slate-800" />

                {/* Summary */}
                {member.summary ? <p className="text-sm leading-relaxed font-medium text-slate-600 dark:text-slate-400">{member.summary}</p> : null}

                {/* Footer actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    {/* Leer bio (modal) */}
                    {hasBio ? (
                        <Dialog>
                            <DialogTrigger asChild>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-bold text-foreground/90 transition hover:border-red-600/40 hover:text-red-600 dark:hover:border-red-400/30 dark:hover:text-red-400"
                                >
                                    Leer bio
                                </button>
                            </DialogTrigger>

                            <DialogContent className="max-h-[85vh] max-w-2xl overflow-hidden p-0">
                                {/* Header del modal */}
                                <div className="border-b border-border/70 p-6">
                                    <DialogHeader className="space-y-1">
                                        <DialogTitle className="text-2xl font-extrabold text-foreground">{member.name}</DialogTitle>

                                        <div className="space-y-1 pt-1">
                                            {member.role ? (
                                                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                                    <Briefcase className="h-4 w-4" />
                                                    <span>{member.role}</span>
                                                </div>
                                            ) : null}

                                            {member.affiliation ? (
                                                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{member.affiliation}</span>
                                                </div>
                                            ) : null}
                                        </div>

                                        {/* Links rápidos */}
                                        {member.email || member.website_url || member.linkedin_url ? (
                                            <div className="flex flex-wrap items-center gap-2 pt-3">
                                                {member.email ? (
                                                    <a
                                                        href={`mailto:${member.email}`}
                                                        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-bold text-foreground/90 transition hover:border-red-600/40 hover:text-red-600 dark:hover:border-red-400/30 dark:hover:text-red-400"
                                                    >
                                                        <Mail className="h-3.5 w-3.5" />
                                                        {member.email}
                                                    </a>
                                                ) : null}

                                                {member.website_url?.trim() ? (
                                                    <a
                                                        href={member.website_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-bold text-foreground/90 transition hover:border-red-600/40 hover:text-red-600 dark:hover:border-red-400/30 dark:hover:text-red-400"
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
                                                        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-bold text-foreground/90 transition hover:border-red-600/40 hover:text-red-600 dark:hover:border-red-400/30 dark:hover:text-red-400"
                                                    >
                                                        <Linkedin className="h-3.5 w-3.5" />
                                                        LinkedIn
                                                    </a>
                                                ) : null}
                                            </div>
                                        ) : null}
                                    </DialogHeader>
                                </div>

                                {/* Body scroll */}
                                <div className="max-h-[calc(85vh-92px)] overflow-y-auto p-6">
                                    {member.summary ? (
                                        <p className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">{member.summary}</p>
                                    ) : null}

                                    <div className="prose prose-slate dark:prose-invert max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: member.bio || '' }} />
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ) : (
                        <span className="text-xs font-semibold text-muted-foreground">Sin bio</span>
                    )}

                    {/* Links mini en la card (opcional) */}
                    {hasLinks ? (
                        <div className="flex items-center gap-2">
                            {member.website_url?.trim() ? (
                                <a
                                    href={member.website_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-bold text-foreground/90 transition hover:border-red-600/40 hover:text-red-600 dark:hover:border-red-400/30 dark:hover:text-red-400"
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
                                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-bold text-foreground/90 transition hover:border-red-600/40 hover:text-red-600 dark:hover:border-red-400/30 dark:hover:text-red-400"
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

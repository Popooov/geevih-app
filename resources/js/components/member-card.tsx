import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Mail, MapPin } from 'lucide-react';

export interface Member {
    id: number;
    nombre: string;
    filiacion: string;
    resumen: string;
    email?: string | null;
    foto?: string | null;
}

interface MemberCardProps {
    member: Member;
    index?: number;
}

export default function MemberCard({ member, index = 0 }: MemberCardProps) {
    const src = member.foto?.trim() ? member.foto : 'public/images/member-placeholder.svg';

    return (
        <Card
            className="group transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 hover:-translate-y-2 hover:shadow-2xl"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            {/* Área de imagen */}
            <div className="relative h-72 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                <img
                    src={src}
                    alt={member.nombre}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                />

                {/* Overlay hover */}
                <div className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Badge email */}
                {member.email ? (
                    <div className="absolute right-4 bottom-4 left-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="flex items-center gap-2 rounded-xl bg-white/90 p-3 text-xs font-bold text-slate-800 shadow-lg backdrop-blur-sm dark:bg-slate-900/90 dark:text-slate-200">
                            <Mail className="h-4 w-4 text-primary" />
                            {member.email}
                        </div>
                    </div>
                ) : null}
            </div>

            <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                    <h3 className="text-xl leading-tight font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                        {member.nombre}
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-bold text-primary dark:text-red-400">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="truncate">{member.filiacion}</span>
                    </div>
                </div>

                <div className="h-px w-full bg-slate-100 dark:bg-slate-800" />

                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase dark:text-slate-500">
                        <Briefcase className="h-3 w-3 text-primary/60" />
                        Perfil Profesional
                    </div>
                    <p className="line-clamp-4 text-sm leading-relaxed font-medium text-slate-600 dark:text-slate-400">{member.resumen}</p>
                </div>
            </CardContent>
        </Card>
    );
}

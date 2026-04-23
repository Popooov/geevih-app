import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Cookie, ExternalLink, Settings2, ShieldCheck } from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';

function Section({
    id,
    title,
    icon: Icon,
    children,
}: {
    id: string;
    title: string;
    icon: ComponentType<{ className?: string }>;
    children: ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-24 rounded-[2rem] bg-background p-5 shadow-sm ring-1 ring-border/50 lg:p-8">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                </div>

                <h2 className="font-headline text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{title}</h2>
            </div>

            <div className="space-y-4 text-sm leading-7 text-muted-foreground">{children}</div>
        </section>
    );
}

export default function CookiesPolicy() {
    const sections = [
        { id: 'que-son', label: 'Qué son' },
        { id: 'cookies-usadas', label: 'Cookies utilizadas' },
        { id: 'finalidad', label: 'Finalidad' },
        { id: 'terceros', label: 'Recursos externos' },
        { id: 'gestion', label: 'Gestión en el navegador' },
    ];

    const cookies = [
        {
            name: 'geevih_session',
            type: 'Técnica',
            purpose: 'Gestiona la sesión del usuario y el funcionamiento básico del sitio web.',
        },
        {
            name: 'XSRF-TOKEN',
            type: 'Técnica',
            purpose: 'Protege el sitio frente a ataques CSRF y mejora la seguridad en formularios y peticiones.',
        },
        {
            name: 'appearance',
            type: 'Funcional',
            purpose: 'Guarda la preferencia visual del usuario, como el modo claro u oscuro.',
        },
    ];

    return (
        <AppLayout>
            <Head title="Política de cookies | GEEVIH" />

            <div className="mx-auto max-w-5xl px-4 pt-4 pb-14 sm:px-6 lg:px-8 lg:pt-6 lg:pb-16">
                <div className="space-y-8">
                    <section className="relative overflow-hidden rounded-[2rem] bg-background/85 px-5 py-7 backdrop-blur-xl sm:px-6 sm:py-8 lg:px-8 lg:py-10 dark:bg-background/70">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(175,16,26,0.14),transparent_60%)]" />

                        <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                    <Cookie className="h-4 w-4" />
                                    Transparencia y funcionamiento
                                </div>

                                <div className="space-y-3">
                                    <h1 className="font-headline text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-5xl">
                                        Política de cookies
                                    </h1>

                                    <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                                        Esta página explica qué cookies utiliza el sitio web de GEEVIH, con qué finalidad se emplean y cómo puede
                                        gestionarlas el usuario desde su navegador.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-[1.75rem] bg-white/85 p-5 ring-1 ring-black/5 backdrop-blur-sm sm:p-6 dark:bg-white/5 dark:ring-white/10">
                                <p className="text-xs font-semibold tracking-[0.14em] text-foreground/70 uppercase dark:text-muted-foreground">
                                    Índice
                                </p>

                                <div className="mt-4 grid gap-1.5">
                                    {sections.map((section) => (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                            className="rounded-xl px-3 py-2 text-sm text-foreground/70 transition hover:bg-primary/6 hover:text-primary dark:text-muted-foreground dark:hover:bg-white/5 dark:hover:text-white"
                                        >
                                            {section.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <Section id="que-son" title="1. ¿Qué son las cookies?" icon={Cookie}>
                        <p>
                            Las cookies son pequeños archivos que se almacenan en el dispositivo del usuario cuando visita una página web. Su función
                            puede ser técnica, funcional o de otra naturaleza, dependiendo del servicio que las utilice.
                        </p>
                    </Section>

                    <Section id="cookies-usadas" title="2. Cookies utilizadas en este sitio" icon={ShieldCheck}>
                        <p>Este sitio utiliza cookies propias de carácter técnico y funcional, necesarias para su correcto funcionamiento.</p>

                        <div className="space-y-3 sm:hidden">
                            {cookies.map((item) => (
                                <div key={item.name} className="rounded-[1.5rem] bg-muted/35 p-4">
                                    <p className="font-medium text-foreground">{item.name}</p>
                                    <p className="mt-2 text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">{item.type}</p>
                                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.purpose}</p>
                                </div>
                            ))}
                        </div>

                        <div className="hidden sm:block">
                            <div className="overflow-x-auto">
                                <table className="w-full border-separate border-spacing-y-3">
                                    <thead>
                                        <tr className="text-left text-xs tracking-[0.14em] text-muted-foreground uppercase">
                                            <th className="px-4 py-2">Cookie</th>
                                            <th className="px-4 py-2">Tipo</th>
                                            <th className="px-4 py-2">Finalidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cookies.map((item) => (
                                            <tr key={item.name} className="bg-muted/35">
                                                <td className="rounded-l-2xl px-4 py-4 text-sm font-medium text-foreground">{item.name}</td>
                                                <td className="px-4 py-4 text-sm text-muted-foreground">{item.type}</td>
                                                <td className="rounded-r-2xl px-4 py-4 text-sm text-muted-foreground">{item.purpose}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Section>

                    <Section id="finalidad" title="3. Finalidad y base de uso" icon={Settings2}>
                        <p>
                            Estas cookies son necesarias para el funcionamiento básico del sitio web y no tienen una finalidad publicitaria ni de
                            seguimiento analítico.
                        </p>

                        <p>En el estado actual del sitio, no se utilizan cookies de análisis, marketing o publicidad.</p>
                    </Section>

                    <Section id="terceros" title="4. Recursos externos y servicios de terceros" icon={ExternalLink}>
                        <p>
                            El sitio puede cargar imágenes o documentos desde servicios externos, como Cloudinary, para la correcta visualización de
                            contenidos.
                        </p>

                        <p>
                            Tras las comprobaciones realizadas en navegación limpia, estos recursos no instalan cookies de seguimiento en el
                            dispositivo del usuario durante la navegación habitual del sitio.
                        </p>

                        <p>
                            Si en el futuro se integraran herramientas de analítica, vídeo embebido, mapas, chats u otros servicios que sí utilicen
                            cookies no técnicas, esta política será actualizada y se implantarán las medidas de consentimiento que correspondan.
                        </p>
                    </Section>

                    <Section id="gestion" title="5. Cómo gestionar las cookies" icon={ShieldCheck}>
                        <p>
                            El usuario puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo mediante la configuración de su
                            navegador. No obstante, desactivar determinadas cookies técnicas puede afectar al correcto funcionamiento del sitio.
                        </p>

                        <p>
                            Para más información sobre el tratamiento de datos personales, puede consultar la{' '}
                            <Link href="/aviso-legal" className="font-medium text-primary hover:underline">
                                página de aviso legal y privacidad
                            </Link>
                            .
                        </p>
                    </Section>
                </div>
            </div>
        </AppLayout>
    );
}

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpenText, ChevronDown, Home, Info, Mail, Menu, Newspaper, Presentation } from 'lucide-react';
import * as React from 'react';
import AppLogo from './app-logo';
import AppearanceToggleDropdown from './appearance-dropdown';

type NavChild = { title: string; href: string };

type HeaderNavItem = {
    title: string;
    href?: string;
    icon?: React.ComponentType<{ className?: string }>;
    children?: NavChild[];
};

const aboutItems: NavChild[] = [
    { title: 'Misión y Objetivos', href: '/sobre/mision-y-objetivos' },
    { title: 'Sobre Nosotros', href: '/sobre/sobre-nosotros' },
    { title: 'Áreas de Trabajo', href: '/sobre/areas-de-trabajo' },
    { title: 'Hacerte Socio', href: '/sobre/hacerte-socio' },
];

const trainingItems: NavChild[] = [
    { title: 'Cursos', href: '/formacion/cursos' },
    { title: 'Webinars', href: '/formacion/webinars' },
    { title: 'Congresos / Jornadas', href: '/formacion/congresos-jornadas' },
    { title: 'Material Docente', href: '/formacion/material-docente' },
    { title: 'Aval de GEEVIH', href: '/formacion/aval-de-geevih' },
];

const recursosItems: NavChild[] = [
    { title: 'Guías y Protocolos', href: '/recursos/guias' },
    { title: 'Herramientas Prácticas', href: '/recursos/herramientas' },
    { title: 'Últimas Evidencias Científicas', href: '/recursos/biblioteca' },
    { title: 'Material de Apoyo al Paciente', href: '/recursos/material' },
    { title: 'Enlaces de Interés', href: '/recursos/enlaces' },
];

const mainNavItems: HeaderNavItem[] = [
    { title: 'Inicio', href: '/', icon: Home },
    { title: 'Sobre GEEVIH', icon: Info, children: aboutItems },
    { title: 'Formación', icon: Presentation, children: trainingItems },
    { title: 'Recursos', icon: BookOpenText, children: recursosItems },
    { title: 'Noticias', href: '/noticias', icon: Newspaper },
    { title: 'Contacto', href: '/contacto', icon: Mail },
];

function isActiveByHref(currentUrl: string, href?: string) {
    if (!href) return false;
    if (href === '/') return currentUrl === '/';
    return currentUrl === href || currentUrl.startsWith(href + '/');
}

function isActiveByChildren(currentUrl: string, children?: NavChild[]) {
    if (!children?.length) return false;
    return children.some((c) => isActiveByHref(currentUrl, c.href));
}

export function AppHeader() {
    const page = usePage<SharedData>();
    const currentUrl = page.url;

    const [aboutOpen, setAboutOpen] = React.useState(() => isActiveByChildren(currentUrl, aboutItems));
    const [trainingOpen, setTrainingOpen] = React.useState(() => isActiveByChildren(currentUrl, trainingItems));
    const [recursosOpen, setRecursosOpen] = React.useState(() => isActiveByChildren(currentUrl, recursosItems));

    React.useEffect(() => {
        if (isActiveByChildren(currentUrl, aboutItems)) setAboutOpen(true);
        if (isActiveByChildren(currentUrl, trainingItems)) setTrainingOpen(true);
        if (isActiveByChildren(currentUrl, recursosItems)) setRecursosOpen(true);
    }, [currentUrl]);

    const getMobileOpenState = (title: string) => {
        if (title === 'Sobre GEEVIH') return aboutOpen;
        if (title === 'Formación') return trainingOpen;
        if (title === 'Recursos') return recursosOpen;
        return false;
    };

    const setMobileOpenState = (title: string, value: boolean) => {
        if (title === 'Sobre GEEVIH') return setAboutOpen(value);
        if (title === 'Formación') return setTrainingOpen(value);
        if (title === 'Recursos') return setRecursosOpen(value);
    };

    const desktopItemActive = 'bg-[#FBEAEC] text-[#AF101A] dark:bg-[#2a0d10] dark:text-[#ffb4b8]';

    const desktopItemOpen =
        'data-[state=open]:bg-[#FCF1F2] data-[state=open]:text-[#AF101A] dark:data-[state=open]:bg-[#2a0d10] dark:data-[state=open]:text-[#ffb4b8]';

    const desktopItemInactive =
        'text-foreground/80 hover:bg-[#FCF1F2] hover:text-[#AF101A] dark:text-foreground/80 dark:hover:bg-[#22090c] dark:hover:text-[#ffb4b8]';

    const desktopItemBase = 'h-10 rounded-full bg-transparent px-3.5 text-[15px] font-medium transition-colors duration-200 xl:px-4';

    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 shadow-[0_1px_12px_rgba(0,0,0,0.06)] backdrop-blur-xl [border-image:linear-gradient(to_right,transparent,#AF101A4D,transparent)_1] supports-[backdrop-filter]:bg-background/85 dark:shadow-[0_1px_16px_rgba(0,0,0,0.25)]">
            <div className="mx-auto flex h-[72px] items-center justify-between px-4 md:max-w-7xl lg:px-6">
                <Link href="/" prefetch className="flex items-center">
                    <AppLogo />
                </Link>

                <div className="flex items-center gap-2 lg:hidden">
                    <AppearanceToggleDropdown />

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                aria-label="Abrir navegación"
                                variant="outline"
                                size="icon"
                                className="h-10 w-10 rounded-full border-border/70 bg-background/80 shadow-sm"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="flex h-full w-[88vw] max-w-sm flex-col border-l border-border/60 bg-background/95 p-0 backdrop-blur-xl"
                        >
                            <SheetHeader className="border-b border-border/60 px-5 py-4 text-left">
                                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                                <SheetDescription className="sr-only">Navegación principal del sitio web de GEEVIH.</SheetDescription>

                                <Link href="/" prefetch className="flex items-center">
                                    <AppLogo />
                                </Link>
                            </SheetHeader>

                            <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
                                <nav className="flex flex-col space-y-2 text-sm">
                                    {mainNavItems.map((item) => {
                                        const hasChildren = !!item.children?.length;
                                        const isActive =
                                            (!hasChildren && isActiveByHref(currentUrl, item.href)) ||
                                            (hasChildren && isActiveByChildren(currentUrl, item.children));

                                        if (hasChildren) {
                                            const open = getMobileOpenState(item.title);

                                            return (
                                                <Collapsible
                                                    key={item.title}
                                                    open={open}
                                                    onOpenChange={(value) => setMobileOpenState(item.title, value)}
                                                    className="flex flex-col"
                                                >
                                                    <CollapsibleTrigger asChild>
                                                        <button
                                                            type="button"
                                                            className={cn(
                                                                'flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-[18px] font-medium transition-colors',
                                                                isActive
                                                                    ? 'bg-[#FBEAEC] text-[#AF101A] dark:bg-[#2a0d10] dark:text-[#ffb4b8]'
                                                                    : 'text-foreground/90 hover:bg-[#FCF1F2] hover:text-[#AF101A] dark:hover:bg-[#22090c] dark:hover:text-[#ffb4b8]',
                                                            )}
                                                            aria-current={isActive ? 'page' : undefined}
                                                        >
                                                            <span className="flex items-center gap-3">
                                                                {item.icon && (
                                                                    <Icon
                                                                        iconNode={item.icon as any}
                                                                        className={cn(
                                                                            'h-[19px] w-[19px]',
                                                                            isActive
                                                                                ? 'text-[#AF101A] dark:text-[#ffb4b8]'
                                                                                : 'text-foreground/60 dark:text-foreground/60',
                                                                        )}
                                                                    />
                                                                )}
                                                                <span>{item.title}</span>
                                                            </span>

                                                            <ChevronDown
                                                                className={cn(
                                                                    'h-4 w-4 shrink-0 transition-transform duration-200',
                                                                    open && 'rotate-180',
                                                                )}
                                                            />
                                                        </button>
                                                    </CollapsibleTrigger>

                                                    <CollapsibleContent>
                                                        <div className="mt-2 ml-2 flex flex-col space-y-1.5 pl-2">
                                                            {item.children!.map((sub) => {
                                                                const isActiveSub = isActiveByHref(currentUrl, sub.href);

                                                                return (
                                                                    <Link
                                                                        key={sub.href}
                                                                        prefetch
                                                                        href={sub.href}
                                                                        className={cn(
                                                                            'rounded-xl px-4 py-3 text-[17px] font-medium transition-colors',
                                                                            isActiveSub
                                                                                ? 'bg-[#FBEAEC] text-[#AF101A] dark:bg-[#2a0d10] dark:text-[#ffb4b8]'
                                                                                : 'text-muted-foreground hover:bg-[#FCF1F2] hover:text-[#AF101A] dark:text-foreground/70 dark:hover:bg-[#22090c] dark:hover:text-[#ffb4b8]',
                                                                        )}
                                                                    >
                                                                        {sub.title}
                                                                    </Link>
                                                                );
                                                            })}
                                                        </div>
                                                    </CollapsibleContent>
                                                </Collapsible>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={item.title}
                                                prefetch
                                                href={item.href!}
                                                className={cn(
                                                    'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[18px] font-medium transition-colors',
                                                    isActive
                                                        ? 'bg-[#FBEAEC] text-[#AF101A] dark:bg-[#2a0d10] dark:text-[#ffb4b8]'
                                                        : 'text-muted-foreground hover:bg-[#FCF1F2] hover:text-[#AF101A] dark:hover:bg-[#22090c] dark:hover:text-[#ffb4b8]',
                                                )}
                                                aria-current={isActive ? 'page' : undefined}
                                            >
                                                {item.icon && (
                                                    <Icon
                                                        iconNode={item.icon as any}
                                                        className={cn(
                                                            'h-[19px] w-[19px]',
                                                            isActive
                                                                ? 'text-[#AF101A] dark:text-[#ffb4b8]'
                                                                : 'text-foreground/60 dark:text-foreground/60',
                                                        )}
                                                    />
                                                )}
                                                <span>{item.title}</span>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="ml-6 hidden h-full items-center lg:flex">
                    <NavigationMenu viewport={false} className="relative flex h-full items-center">
                        <NavigationMenuList className="flex h-full items-center gap-2 xl:gap-3">
                            {mainNavItems.map((item, index) => {
                                const hasChildren = !!item.children?.length;
                                const isActive =
                                    (!hasChildren && isActiveByHref(currentUrl, item.href)) ||
                                    (hasChildren && isActiveByChildren(currentUrl, item.children));

                                if (hasChildren) {
                                    return (
                                        <NavigationMenuItem key={index} className="relative">
                                            <NavigationMenuTrigger
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    desktopItemBase,
                                                    isActive ? desktopItemActive : desktopItemInactive,
                                                    desktopItemOpen,
                                                )}
                                            >
                                                {item.icon && (
                                                    <Icon
                                                        iconNode={item.icon as any}
                                                        className={cn(
                                                            'mr-2 hidden h-4 w-4 xl:block',
                                                            isActive || isActiveByChildren(currentUrl, item.children)
                                                                ? 'text-[#AF101A] dark:text-[#ffb4b8]'
                                                                : 'text-foreground/50 dark:text-foreground/55',
                                                        )}
                                                    />
                                                )}
                                                {item.title}
                                            </NavigationMenuTrigger>

                                            <NavigationMenuContent className="top-full mt-2 rounded-2xl border border-border/60 bg-background/98 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/8 dark:bg-neutral-950/96">
                                                <ul className="grid w-[232px] gap-1">
                                                    {item.children!.map((sub) => {
                                                        const isActiveSub = isActiveByHref(currentUrl, sub.href);

                                                        return (
                                                            <li key={sub.href}>
                                                                <NavigationMenuLink asChild>
                                                                    <Link
                                                                        href={sub.href}
                                                                        prefetch
                                                                        className={cn(
                                                                            'block rounded-xl px-3 py-2.5 text-[14.5px] font-medium transition-colors duration-200 outline-none',
                                                                            isActiveSub
                                                                                ? 'bg-[#FBEAEC] text-[#AF101A] dark:bg-[#2a0d10] dark:text-[#ffb4b8]'
                                                                                : 'text-foreground/80 hover:bg-[#FCF1F2] hover:text-[#AF101A] dark:text-foreground/80 dark:hover:bg-[#22090c] dark:hover:text-[#ffb4b8]',
                                                                        )}
                                                                    >
                                                                        {sub.title}
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    );
                                }

                                return (
                                    <NavigationMenuItem key={index} className="relative">
                                        <Link
                                            href={item.href!}
                                            prefetch
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                desktopItemBase,
                                                isActive ? desktopItemActive : desktopItemInactive,
                                            )}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            {item.icon && (
                                                <Icon
                                                    iconNode={item.icon as any}
                                                    className={cn(
                                                        'mr-2 hidden h-4 w-4 xl:block',
                                                        isActive
                                                            ? 'text-[#AF101A] dark:text-[#ffb4b8]'
                                                            : 'text-foreground/50 dark:text-foreground/55',
                                                    )}
                                                />
                                            )}
                                            {item.title}
                                        </Link>
                                    </NavigationMenuItem>
                                );
                            })}
                        </NavigationMenuList>

                        <div className="ml-4 flex items-center">
                            <AppearanceToggleDropdown />
                        </div>
                    </NavigationMenu>
                </div>
            </div>
        </header>
    );
}

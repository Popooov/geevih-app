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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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

    const desktopItemBase = 'h-10 rounded-full rounded-full px-4 xl:px-5 text-[15px] font-medium transition-all duration-200 bg-transparent px-4 xl:px-5 text-[15px] font-medium transition-colors';

    const desktopItemInactive =
        'text-foreground/80 hover:bg-muted hover:text-foreground dark:text-foreground/75 dark:hover:bg-white/10 dark:hover:text-foreground';

    const desktopItemActive = 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-200';

    // const dropdownItemBase = 'block rounded-xl px-3 py-2.5 text-sm transition-colors outline-none';

    return (
        <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
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

                        <SheetContent side="right" className="flex h-full w-72 flex-col bg-background p-0">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                            <SheetHeader className="border-b px-5 py-4 text-left">
                                <Link href="/" prefetch className="flex items-center">
                                    <AppLogo />
                                </Link>
                            </SheetHeader>

                            <div className="flex flex-1 flex-col overflow-y-auto p-4">
                                <nav className="flex flex-col space-y-1.5 text-sm">
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
                                                                'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors',
                                                                isActive
                                                                    ? 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-200'
                                                                    : 'text-foreground/85 hover:bg-muted hover:text-foreground',
                                                            )}
                                                            aria-current={isActive ? 'page' : undefined}
                                                        >
                                                            <span className="flex items-center gap-3">
                                                                {item.icon && (
                                                                    <Icon iconNode={item.icon as any} className="h-[18px] w-[18px] opacity-80" />
                                                                )}
                                                                <span>{item.title}</span>
                                                            </span>

                                                            <ChevronDown
                                                                className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
                                                            />
                                                        </button>
                                                    </CollapsibleTrigger>

                                                    <CollapsibleContent>
                                                        <div className="mt-2 ml-4 flex flex-col space-y-1 border-l border-border/60 pl-4">
                                                            {item.children!.map((sub) => {
                                                                const isActiveSub = isActiveByHref(currentUrl, sub.href);

                                                                return (
                                                                    <Link
                                                                        key={sub.href}
                                                                        prefetch
                                                                        href={sub.href}
                                                                        className={cn(
                                                                            'rounded-xl px-3 py-2 text-sm transition-colors',
                                                                            isActiveSub
                                                                                ? 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-200'
                                                                                : 'text-foreground/85 hover:bg-muted hover:text-foreground',
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
                                                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium transition-all duration-200',
                                                    isActive
                                                        ? 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-200'
                                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                                )}
                                                aria-current={isActive ? 'page' : undefined}
                                            >
                                                {item.icon && <Icon iconNode={item.icon as any} className="h-[18px] w-[18px] opacity-80" />}
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
                                                    'h-10 rounded-full transition-colors bg-transparent px-4 text-[15px] font-medium xl:px-5',
                                                    isActive
                                                        ? 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-200'
                                                        : 'text-foreground/85 hover:bg-muted hover:text-foreground dark:text-foreground/80 dark:hover:bg-white/10',
                                                    'data-[state=open]:bg-red-50 data-[state=open]:text-red-700 dark:data-[state=open]:bg-red-950/40 dark:data-[state=open]:text-red-200',
                                                    'transition-colors duration-200',
                                                )}
                                            >
                                                {item.icon && (
                                                    <Icon
                                                        iconNode={item.icon as any}
                                                        className={cn(
                                                            'mr-2 hidden h-4 w-4 xl:block',
                                                            isActive ? 'text-red-600 dark:text-red-400' : 'text-foreground/50',
                                                        )}
                                                    />
                                                )}
                                                {item.title}
                                            </NavigationMenuTrigger>

                                            <NavigationMenuContent className="top-full mt-2 rounded-2xl border border-border/60 bg-background/95 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:bg-neutral-950/95">
                                                <ul className="grid w-[260px] gap-1">
                                                    {item.children!.map((sub) => {
                                                        const isActiveSub = isActiveByHref(currentUrl, sub.href);

                                                        return (
                                                            <li key={sub.href}>
                                                                <NavigationMenuLink asChild>
                                                                    <Link
                                                                        href={sub.href}
                                                                        prefetch
                                                                        className={cn(
                                                                            'block rounded-xl px-3 py-2.5 text-sm outline-none transition-all duration-200',
                                                                            isActiveSub
                                                                                ? 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-200'
                                                                                : 'text-foreground/85 hover:bg-muted hover:text-foreground dark:text-foreground/80 dark:hover:bg-white/10',
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
                                                        isActive ? 'text-red-600 dark:text-red-400' : 'text-foreground/50',
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

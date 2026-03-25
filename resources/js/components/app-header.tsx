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
import { BookOpenText, Presentation, ChevronDown, Home, Info, Mail, Menu, Newspaper } from 'lucide-react';
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

const activeItemStyles = 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';
const activeAccent = 'text-red-600 dark:text-red-400';
const hoverBg = 'hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150';

function isActiveByHref(currentUrl: string, href?: string) {
    if (!href) return false;
    return currentUrl === href || currentUrl.startsWith(href + '/');
}

function isActiveByChildren(currentUrl: string, children?: NavChild[]) {
    if (!children?.length) return false;
    return children.some((c) => isActiveByHref(currentUrl, c.href));
}

export function AppHeader() {
    const page = usePage<SharedData>();
    const currentUrl = page.url;

    // Auto-open en móvil cuando estás dentro de una sección
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

    const setMobileOpenState = (title: string, v: boolean) => {
        if (title === 'Sobre GEEVIH') return setAboutOpen(v);
        if (title === 'Formación') return setTrainingOpen(v);
        if (title === 'Recursos') return setRecursosOpen(v);
    };

    return (
        <>
            <div className="border-b border-sidebar-border/80">
                <div className="mx-auto flex h-16 items-center justify-between px-4 md:max-w-7xl">
                    {/* Logo */}
                    <Link href="/" prefetch className="flex items-center space-x-2">
                        <AppLogo />
                    </Link>

                    {/* Mobile controls */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <div className="flex items-center">
                            <AppearanceToggleDropdown />
                        </div>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button aria-label="Abrir navegación" variant="ghost" size="icon" className="h-[34px] w-[34px]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent side="right" className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetHeader className="flex justify-start text-left" />

                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-1.5">
                                            {mainNavItems.map((item) => {
                                                const hasChildren = !!item.children?.length;
                                                const isActive =
                                                    (!hasChildren && isActiveByHref(currentUrl, item.href)) ||
                                                    (hasChildren && isActiveByChildren(currentUrl, item.children));

                                                // Secciones con desplegable (móvil)
                                                if (hasChildren) {
                                                    const open = getMobileOpenState(item.title);

                                                    return (
                                                        <Collapsible
                                                            key={item.title}
                                                            open={open}
                                                            onOpenChange={(v) => setMobileOpenState(item.title, v)}
                                                            className="flex flex-col"
                                                        >
                                                            <CollapsibleTrigger asChild>
                                                                <button
                                                                    type="button"
                                                                    className={cn(
                                                                        'flex w-full items-center justify-between rounded-md px-4 py-3 text-base font-medium',
                                                                        isActive ? activeAccent : 'text-neutral-600 dark:text-neutral-300',
                                                                        hoverBg,
                                                                    )}
                                                                    aria-current={isActive ? 'true' : undefined}
                                                                >
                                                                    <span className="flex items-center gap-3">
                                                                        {item.icon && <Icon iconNode={item.icon as any} className="h-5 w-5" />}
                                                                        <span>{item.title}</span>
                                                                    </span>

                                                                    <ChevronDown
                                                                        className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
                                                                    />
                                                                </button>
                                                            </CollapsibleTrigger>

                                                            <CollapsibleContent>
                                                                <div className="mt-2 ml-7 flex flex-col space-y-2 text-[0.95rem]">
                                                                    {item.children!.map((sub) => {
                                                                        const isActiveSub = isActiveByHref(currentUrl, sub.href);
                                                                        return (
                                                                            <Link
                                                                                key={sub.href}
                                                                                prefetch
                                                                                href={sub.href}
                                                                                className={cn(
                                                                                    'rounded-md px-2 py-1.5 ' + hoverBg,
                                                                                    isActiveSub
                                                                                        ? 'bg-muted text-red-600 dark:text-red-400'
                                                                                        : 'text-neutral-500 dark:text-neutral-400',
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

                                                // Links simples (móvil)
                                                return (
                                                    <div key={item.title} className="flex flex-col">
                                                        <Link
                                                            prefetch
                                                            href={item.href!}
                                                            className={cn(
                                                                'flex items-center gap-3 rounded-md px-4 py-3 text-base font-medium',
                                                                isActive ? `bg-muted ${activeAccent}` : 'text-muted-foreground',
                                                                hoverBg,
                                                            )}
                                                        >
                                                            {item.icon && <Icon iconNode={item.icon as any} className="h-5 w-5" />}
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                        <NavigationMenu viewport={false} className="relative flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => {
                                    const hasChildren = !!item.children?.length;
                                    const isActive =
                                        (!hasChildren && isActiveByHref(currentUrl, item.href)) ||
                                        (hasChildren && isActiveByChildren(currentUrl, item.children));

                                    const triggerHoverBg = hoverBg;

                                    // Dropdown (desktop)
                                    if (hasChildren) {
                                        return (
                                            <NavigationMenuItem key={index} className="relative z-10 flex h-full items-center">
                                                <NavigationMenuTrigger
                                                    className={cn(
                                                        navigationMenuTriggerStyle(),
                                                        'h-9 cursor-pointer lg:px-3 xl:px-5',
                                                        isActive && activeItemStyles,
                                                        'data-[state=open]:bg-red-50 data-[state=open]:text-neutral-900 dark:data-[state=open]:bg-red-900/20 dark:data-[state=open]:text-neutral-100',
                                                        triggerHoverBg,
                                                        'focus-visible:ring-2 focus-visible:ring-red-300 dark:focus-visible:ring-red-600/40',
                                                    )}
                                                >
                                                    {item.icon && (
                                                        <Icon
                                                            iconNode={item.icon as any}
                                                            className={cn(
                                                                'mr-1 hidden h-4 w-4 lg:mr-2 xl:block',
                                                                isActive
                                                                    ? 'text-red-600 dark:text-red-400'
                                                                    : 'text-neutral-800 dark:text-neutral-200',
                                                            )}
                                                        />
                                                    )}
                                                    {item.title}
                                                </NavigationMenuTrigger>

                                                <NavigationMenuContent>
                                                    <ul className="grid w-[260px] gap-3">
                                                        {item.children!.map((sub) => {
                                                            const isActiveSub = isActiveByHref(currentUrl, sub.href);
                                                            return (
                                                                <li key={sub.href}>
                                                                    <NavigationMenuLink asChild>
                                                                        <Link
                                                                            href={sub.href}
                                                                            prefetch
                                                                            className={cn(
                                                                                'block rounded-md px-3 py-3 text-sm leading-none outline-none select-none',
                                                                                hoverBg,
                                                                                isActiveSub && 'bg-red-50',
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

                                                {isActive && (
                                                    <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-red-600 dark:bg-red-400" />
                                                )}
                                            </NavigationMenuItem>
                                        );
                                    }

                                    // Link simple (desktop)
                                    return (
                                        <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                            <Link
                                                href={item.href!}
                                                prefetch
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    isActive && activeItemStyles,
                                                    'h-9 cursor-pointer lg:px-3 xl:px-5',
                                                    triggerHoverBg,
                                                )}
                                            >
                                                {item.icon && (
                                                    <Icon
                                                        iconNode={item.icon as any}
                                                        className={cn(
                                                            'mr-1 hidden h-4 w-4 lg:mr-2 xl:block',
                                                            isActive ? 'text-red-600 dark:text-red-400' : 'text-neutral-800 dark:text-neutral-200',
                                                        )}
                                                    />
                                                )}
                                                {item.title}
                                            </Link>

                                            {isActive && (
                                                <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-red-600 dark:bg-red-400" />
                                            )}
                                        </NavigationMenuItem>
                                    );
                                })}
                            </NavigationMenuList>

                            {/* Dropdown de apariencia (desktop) */}
                            <div className="ml-4 flex items-center">
                                <AppearanceToggleDropdown />
                            </div>
                        </NavigationMenu>
                    </div>
                </div>
            </div>
        </>
    );
}

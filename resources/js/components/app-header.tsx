import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
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
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpenText, Calendar, Home, Info, LayoutGrid, Mail, Menu, Newspaper } from 'lucide-react';
import AppLogo from './app-logo';
import AppearanceToggleDropdown from './appearance-dropdown';

const mainNavItems: NavItem[] = [
    { title: 'Inicio', href: '/', icon: Home },
    { title: 'Sobre Nosotros', href: '/sobre', icon: Info },
    { title: 'Áreas', href: '/areas', icon: LayoutGrid },
    { title: 'Eventos', href: '/eventos', icon: Calendar },
    { title: 'Recursos', href: '/recursos', icon: BookOpenText },
    { title: 'Noticias', href: '/noticias', icon: Newspaper },
    { title: 'Contacto', href: '/contacto', icon: Mail },
];

const recursosItems = [
    { title: 'Guías y Protocolos', href: '/recursos/guias' },
    { title: 'Herramientas Prácticas', href: '/recursos/herramientas' },
    { title: 'Últimas Evidencias Científicas', href: '/recursos/biblioteca' },
    { title: 'Material de Apoyo al Paciente', href: '/recursos/material' },
    { title: 'Enlaces de Interés', href: '/recursos/enlaces' },
];

const activeItemStyles = 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';
const activeAccent = 'text-red-600 dark:text-red-400';
const hoverBg = 'hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();

    return (
        <>
            <div className="border-b border-sidebar-border/80">
                <div className="mx-auto flex h-16 items-center justify-between px-4 md:max-w-7xl">
                    {/* Logo */}
                    <Link href="/" prefetch className="flex items-center space-x-2">
                        <AppLogo />
                    </Link>

                    {/* Mobile controls: Appearance toggle + Menu button */}
                    <div className="flex items-center gap-2 lg:hidden">
                        {/* Appearance toggle next to menu button (mobile) */}
                        <div className="flex items-center">
                            <AppearanceToggleDropdown />
                        </div>

                        {/* Mobile Menu */}
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
                                                const isRecursos = item.title === 'Recursos';
                                                const isActive = page.url === item.href || (isRecursos && page.url.startsWith('/recursos'));

                                                if (isRecursos) {
                                                    return (
                                                        <div key={item.title} className="flex flex-col">
                                                            <div
                                                                className={cn(
                                                                    'flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 text-base font-medium',
                                                                    isActive ? activeAccent : 'text-neutral-600 dark:text-neutral-300',
                                                                    hoverBg,
                                                                )}
                                                                aria-current={isActive ? 'true' : undefined}
                                                            >
                                                                {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                                <span>Recursos</span>
                                                            </div>

                                                            {/* Sub-enlaces */}
                                                            <div className="mt-2 ml-7 flex flex-col space-y-2 text-[0.95rem]">
                                                                {recursosItems.map((sub) => (
                                                                    <Link
                                                                        key={sub.href}
                                                                        prefetch
                                                                        href={sub.href}
                                                                        className={cn(
                                                                            'rounded-md px-2 py-1.5 ' + hoverBg,
                                                                            page.url.startsWith(sub.href)
                                                                                ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                                                                : 'text-neutral-400 dark:text-neutral-400',
                                                                        )}
                                                                    >
                                                                        {sub.title}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div key={item.title} className="flex flex-col">
                                                        <Link
                                                            prefetch
                                                            href={item.href}
                                                            className={cn(
                                                                'flex items-center gap-3 rounded-md px-4 py-3 text-base font-medium',
                                                                page.url === item.href ? `bg-muted ${activeAccent}` : 'text-muted-foreground',
                                                                hoverBg,
                                                            )}
                                                        >
                                                            {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
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
                                    const isRecursos = item.title === 'Recursos';
                                    const isActive = page.url === item.href || (isRecursos && page.url.startsWith('/recursos'));

                                    const triggerHoverBg = hoverBg;

                                    if (isRecursos) {
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
                                                            iconNode={item.icon}
                                                            className={cn(
                                                                'mr-1 hidden h-4 w-4 lg:mr-2 xl:block',
                                                                isActive
                                                                    ? 'text-red-600 dark:text-red-400'
                                                                    : 'text-neutral-400 dark:text-neutral-400',
                                                            )}
                                                        />
                                                    )}
                                                    {item.title}
                                                </NavigationMenuTrigger>

                                                <NavigationMenuContent>
                                                    <ul className="grid w-[250px] gap-3">
                                                        {recursosItems.map((sub) => {
                                                            const isActiveSub = page.url === sub.href || page.url.startsWith(sub.href + '/');
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

                                    return (
                                        <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                            <Link
                                                href={item.href}
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
                                                        iconNode={item.icon}
                                                        className={cn(
                                                            'mr-1 hidden h-4 w-4 lg:mr-2 xl:block',
                                                            isActive ? 'text-red-600 dark:text-red-400' : 'text-neutral-400 dark:text-neutral-400',
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

            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}

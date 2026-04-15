import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

/**
 * EVENTS
 */
export interface EventItem {
    id: number;

    titulo: string;
    lugar?: string | null;
    fecha: string;
    hora?: string | null;

    descripcion?: string | null;
    imagen?: string | null;

    link?: string | null;
    slug?: string;

    is_online?: boolean;
    registration_url?: string | null;
    online_url?: string | null;

    end_at?: string | null;
    isOngoing?: boolean;
    isPast?: boolean;

    category?: string | null;
    category_slug?: string | null;
}

export interface EventCategoryInfo {
    name: string;
    slug: string;
}

export interface EventPagination {
    current_page: number;
    last_page: number;
    total: number;
}

export type EventFilterMode = 'all' | 'online' | 'presencial';

export interface SingleEvent {
    id: number;
    titulo: string;
    lugar: string;
    fecha: string;
    hora?: string | null;
    descripcion?: string | null;
    contenido?: string | null;
    imagen?: string | null;

    is_online?: boolean;
    registration_url?: string | null;
    online_url?: string | null;

    fin?: string | null;
    slug?: string;

    category?: string | null;
    category_slug?: string | null;
}

/**
 * NEWS
 */
export interface NewsItem {
    id: number;

    titulo: string;
    fecha: string;
    descripcion: string;

    imagen?: string | null;

    link?: string | null;
    slug?: string;
}

export interface SingleNews {
    id: number;

    titulo: string;
    fecha: string;
    descripcion: string;
    contenido?: string | null;

    imagen?: string | null;

    source_url?: string | null;
    slug?: string;
}

/**
 * PAGE PROPS
 */
export interface EventPageProps {
    upcomingEvents: EventItem[];
    pastEvents: EventItem[];
    currentCategory: EventCategoryInfo | null;
    pastPagination: EventPagination;
    currentFilter: EventFilterMode;
    [key: string]: unknown;
}

export interface ShowEventPageProps {
    event: SingleEvent;
    [key: string]: unknown;
}

export interface NewsPageProps {
    news: NewsItem[];
    [key: string]: unknown;
}

export interface ShowNewsPageProps {
    singleNews: SingleNews;
    [key: string]: unknown;
}

/**
 * RESOURCES
 */
export interface Resource {
    id: number;
    titulo: string;
    tipo: string;
    fecha: string;
    enlace: string;
    imagen?: string;
    descripcion?: string;
}

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface ResourcesPageProps {
    resources: Resource[];
    pagination: PaginationMeta;
    [key: string]: unknown;
}

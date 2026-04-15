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
 * Mantiene el shape "ES" para no tocar React, pero añade campos nuevos.
 */
export interface EventItem {
    id: number;

    // legacy / frontend-friendly
    titulo: string;
    lugar: string;
    fecha: string; // ej: "Jan 28, 2026" (toFormattedDateString)
    hora?: string | null;

    descripcion?: string | null;
    imagen?: string | null;

    // navegación
    link?: string | null;
    slug?: string; // si lo quieres usar en front

    // nuevos (útiles para EventCard / lógica)
    is_online?: boolean;
    registration_url?: string | null;
    online_url?: string | null;

    // opcional: si en algún momento quieres mostrar rangos
    end_at?: string | null; // ISO string si lo mandas así (recomendado), o texto formateado
    isOngoing?: boolean;
    isPast?: boolean;

    category?: string | null;
    category_slug?: string | null;
}

export interface EventCategoryInfo {
    name: string;
    slug: string;
}

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

    isOngoing?: boolean;

    category?: string | null;
    category_slug?: string | null;

    link?: string | null;
    backLink?: string | null;
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

    // navegación
    link?: string | null;
    slug?: string; // recomendado para /noticias/{slug}
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
    currentCategory?: EventCategoryInfo | null;
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
 * RESOURCES (lo dejo igual, pero si luego quieres lo adaptamos)
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

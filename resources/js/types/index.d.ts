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
    [key: string]: unknown; // This allows for additional properties...
}

export interface Events {
    id: number;
    titulo: string;
    lugar: string;
    fecha: string;
    hora?: string;
    descripcion: string;
    imagen: string;
    link?: string;
}

export interface SingleEvent {
    id: number;
    titulo: string;
    lugar: string;
    fecha: string;
    hora?: string;
    descripcion: string;
    contenido?: string;
    imagen: string;
}

export interface News {
    id: number;
    titulo: string;
    fecha: string;
    descripcion: string;
    imagen: string;
    link?: string;
}

export interface SingleNews {
    id: number;
    titulo: string;
    fecha: string;
    descripcion: string;
    contenido?: string;
    imagen: string;
}

export interface EventPageProps {
    upcomingEvents: Events[];
    pastEvents: Events[];
    [key: string]: unknown;
}

export interface ShowEventPageProps {
    event: SingleEvent;
    [key: string]: unknown;
}

export interface NewsPageProps {
    news: News[];
    [key: string]: unknown;
}

export interface ShowNewsPageProps {
    singleNews: SingleNews;
    [key: string]: unknown;
}

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

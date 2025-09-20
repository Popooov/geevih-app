import Section from './section';
import { type PageProps } from '@inertiajs/core';

export default function Index(props: PageProps<{ breadcrumbs?: any }>) {
  return (
    <Section
      title="Recursos"
      description="Acceso rápido a guías, herramientas, artículos científicos, materiales para pacientes y enlaces de interés."
      breadcrumbs={props.breadcrumbs}
      items={[
        { title: 'Guías y Protocolos', href: '/recursos/guias', description: 'Procedimientos y recomendaciones actualizadas.' },
        { title: 'Herramientas Prácticas', href: '/recursos/herramientas', description: 'Calculadoras, checklists y plantillas.' },
        { title: 'Biblioteca de Artículos Científicos', href: '/recursos/biblioteca', description: 'Selección curada de publicaciones.' },
        { title: 'Material de Apoyo al Paciente', href: '/recursos/material', description: 'Folletos y recursos educativos.' },
        { title: 'Links de interés', href: '/recursos/enlaces', description: 'Organismos, asociaciones y proyectos.' },
      ]}
    />
  );
}

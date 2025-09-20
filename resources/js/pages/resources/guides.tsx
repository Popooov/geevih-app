import Section from './section';
import { type PageProps } from '@inertiajs/core';

export default function Guias(props: PageProps<{ breadcrumbs?: any }>) {
  return (
    <Section
      title="Guías y Protocolos"
      description="Compendio de guías clínicas y protocolos validados por el grupo GEEVIH."
      breadcrumbs={props.breadcrumbs}
      items={[
        { title: 'Profilaxis preexposición (PrEP)', href: '#' },
        { title: 'Manejo de ITS', href: '#' },
        { title: 'Atención integral VIH', href: '#' },
      ]}
    />
  );
}

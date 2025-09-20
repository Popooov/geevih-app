import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type Item = { title: string; href?: string; description?: string };

interface SectionProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  items?: Item[];
  children?: React.ReactNode;
}

export default function Section({ title, description, breadcrumbs = [], items = [], children }: SectionProps) {
  return (
    <>
      <Head title={title} />
      <div className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description && <p className="mt-2 text-muted-foreground">{description}</p>}
        </div>

        <Separator className="mb-6" />

        {children ||
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <Card
                key={it.href ?? it.title}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-base">
                    {it.href ? <Link href={it.href}>{it.title}</Link> : it.title}
                  </CardTitle>
                </CardHeader>
                {it.description && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{it.description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        }
      </div>
    </>
  );
}

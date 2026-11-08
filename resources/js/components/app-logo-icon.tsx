import logoUrl from '@/assets/geevih-logo.png';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export default function AppLogoIcon({ className, ...props }: Omit<ComponentProps<'img'>, 'src' | 'alt'>) {
    return <img {...props} alt="GEEVIH, grupo integrado en SEISIDA" src={logoUrl} className={cn('site-logo w-full', className)} />;
}

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentProps } from 'react';

const siteButtonVariants = cva(
    'inline-flex h-auto min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-center text-sm font-semibold whitespace-normal transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                primary: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
                secondary: 'border border-border bg-card text-card-foreground shadow-none hover:bg-muted hover:text-foreground',
                ghost: 'bg-transparent text-primary shadow-none hover:bg-primary/10 hover:text-primary',
            },
        },
        defaultVariants: { variant: 'primary' },
    },
);

type SiteButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size'> & VariantProps<typeof siteButtonVariants>;

function SiteButton({ variant = 'primary', className, asChild = false, type, ...props }: SiteButtonProps) {
    const buttonVariant = variant === 'secondary' ? 'outline' : variant === 'ghost' ? 'ghost' : 'default';

    return (
        <Button
            {...props}
            asChild={asChild}
            type={asChild ? undefined : (type ?? 'button')}
            variant={buttonVariant}
            className={cn(siteButtonVariants({ variant }), className)}
        />
    );
}

export { SiteButton, siteButtonVariants };

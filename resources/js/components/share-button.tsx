import { SiteButton } from '@/components/site-button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Copy, Share2 } from 'lucide-react';
import { useRef, useState } from 'react';

export function ShareButton({ title, url }: { title: string; url: string }) {
    const [nativeShareFailed, setNativeShareFailed] = useState(false);
    const [pending, setPending] = useState(false);
    const [manualCopyOpen, setManualCopyOpen] = useState(false);
    const [status, setStatus] = useState('');
    const buttonRef = useRef<HTMLButtonElement>(null);

    const supportsShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function' && !nativeShareFailed;
    const Icon = supportsShare ? Share2 : Copy;

    async function shareOrCopy() {
        if (pending) {
            return;
        }

        setPending(true);
        setStatus('');

        try {
            if (supportsShare) {
                await navigator.share({ title, url });
                return;
            }

            if (!navigator.clipboard?.writeText) {
                setManualCopyOpen(true);
                return;
            }

            await navigator.clipboard.writeText(url);
            setStatus('Enlace copiado');
        } catch (error) {
            if (!supportsShare) {
                setManualCopyOpen(true);
            } else if (!(error instanceof DOMException && error.name === 'AbortError')) {
                setNativeShareFailed(true);
                setStatus('Puedes copiar el enlace.');
            }
        } finally {
            setPending(false);
        }
    }

    return (
        <Dialog open={manualCopyOpen} onOpenChange={setManualCopyOpen}>
            <div className="relative">
                <SiteButton ref={buttonRef} variant="secondary" className="px-3 py-2" aria-disabled={pending} onClick={shareOrCopy}>
                    <Icon aria-hidden="true" />
                    {supportsShare ? 'Compartir' : 'Copiar enlace'}
                </SiteButton>

                <span role="status" className="absolute end-0 top-full mt-1 text-xs leading-none whitespace-nowrap text-muted-foreground">
                    {status}
                </span>
            </div>

            <DialogContent
                onCloseAutoFocus={(event) => {
                    event.preventDefault();
                    buttonRef.current?.focus();
                }}
            >
                <DialogHeader className="pr-10 text-left">
                    <DialogTitle>Compartir enlace</DialogTitle>
                    <DialogDescription>Selecciona y copia el enlace para compartirlo.</DialogDescription>
                </DialogHeader>
                <Input
                    aria-label="Enlace para compartir"
                    className="h-11"
                    value={url}
                    readOnly
                    onFocus={({ currentTarget }) => currentTarget.select()}
                />
            </DialogContent>
        </Dialog>
    );
}

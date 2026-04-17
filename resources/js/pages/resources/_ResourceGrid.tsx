import type { PropsWithChildren } from 'react';

export default function ResourceGrid({ children }: PropsWithChildren) {
    return <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">{children}</div>;
}

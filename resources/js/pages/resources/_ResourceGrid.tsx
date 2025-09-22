import type { PropsWithChildren } from 'react';

export default function ResourceGrid({ children }: PropsWithChildren) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

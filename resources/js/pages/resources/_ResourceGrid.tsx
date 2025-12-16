import type { PropsWithChildren } from 'react';

export default function ResourceGrid({ children }: PropsWithChildren) {
  return <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 gap-8">{children}</div>;
}

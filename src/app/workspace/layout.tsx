import { ReactNode } from 'react';
import { Metadata } from 'next';

interface WorkspaceLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Workspace | AthenaOS',
  description: 'Your workspace with AI agents',
};

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return (
    <div className="flex h-full flex-col">
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}

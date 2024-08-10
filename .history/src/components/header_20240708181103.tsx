import { ThemeToggle } from '~/routes/resources.theme-toggle';
import { Command } from 'lucide-react';
import Link from 'next/link';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from './ui/button';
import { CodeView } from '@components/code-view';

export const Header = () => {
  return (
    <nav className="flex items-center justify-between p-4 w-full border-b">
      <Link href="/" className="flex items-center space-x-2">
      <Command className="h-8 w-8" />
        <h2 className="text-xl font-semibold">Drag-cn</h2>
      </Link>
      {/* <ThemeToggle /> */}
    </nav>
  );
};

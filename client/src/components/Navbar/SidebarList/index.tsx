'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { updatedRoutes } from '@/config/routes';
import { Code, Database } from 'lucide-react';
import Link from 'next/link';

type SidebarProps = {
  open: boolean;
  toggleSidebar: (newOpen: boolean) => () => void;
};

export default function SidebarList({ open, toggleSidebar }: SidebarProps) {
  return (
    <div className="w-64" role="presentation">
      <Accordion type="single" collapsible className="w-full">
        {updatedRoutes.map((route) => (
          <AccordionItem key={route.id} value={route.id ?? ''}>
            <AccordionTrigger className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
              <span className="flex items-center gap-2">
                {route.id === 'automations' ? (
                  <Database className="h-5 w-5" />
                ) : (
                  <Code className="h-5 w-5" />
                )}
                {route.name}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col">
                {route.children?.map((child) => (
                  <Link
                    key={child.path}
                    href={child.path}
                    className="block px-4 py-2 pl-8 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={toggleSidebar(false)}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

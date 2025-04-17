'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

type TabItem = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
};

export default function CustomTabs({ tabs }: TabsProps) {
  const [value, setValue] = useState('0');

  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList className={`grid grid-cols-4 md:grid-cols-2 gap-2`}>
        {tabs.map((tab, index) => (
          <TabsTrigger
            className="w-full border text-center font-bold"
            key={index}
            value={index.toString()}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent key={index} value={index.toString()} className="pt-8">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

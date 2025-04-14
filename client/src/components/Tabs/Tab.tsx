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
    <Tabs value={value} onValueChange={setValue} className="w-full">
      <TabsList
        className={`grid grid-cols-2 md:grid-cols-[repeat(auto,minmax(0,1fr))] gap-2 w-full h-full`}
      >
        {tabs.map((tab, index) => (
          <TabsTrigger
            className="w-full border"
            key={index}
            value={index.toString()}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent key={index} value={index.toString()}>
          <div className="p-4">{tab.content}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full flex-col items-center justify-center gap-8 bg-zinc-950 text-white">
        <span className="text-4xl font-black">Não encontrada</span>
        <span className="text-sm">
          Desculpe, essa página não foi encontrada 🥺
        </span>
        <Link href="/">
          <Button
            variant="link"
            className="border border-white font-bold text-white"
          >
            Voltar
          </Button>
        </Link>
      </div>
    </div>
  );
}

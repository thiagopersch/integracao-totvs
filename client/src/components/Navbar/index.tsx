'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { updatedRoutes } from '@/config/routes';
import { cn } from '@/lib/utils';
import {
  ArrowDown,
  ArrowUp,
  Link as LinkIcon,
  LogOut,
  Menu,
  User,
  X,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ModeToggle } from '../ModeToggle';
import SidebarList from './SidebarList';

const Navbar = () => {
  const { data: session } = useSession();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [currentSubMenu, setCurrentSubMenu] = useState<string | null>(null);

  const isAuthenticated = !!session?.user;

  const toggleSidebar = (newOpen: boolean) => () => {
    setOpenSidebar(newOpen);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/signIn');
  };

  return (
    <>
      <header className="border-b bg-black relative z-10">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center px-4">
          {/* Logo */}
          <div className="mr-4">
            <Link href="/">
              <LinkIcon className="h-8 w-8 text-white" />
            </Link>
          </div>

          {/* Tagline */}
          <span className="flex-1 text-sm font-semibold italic text-white">
            Integração TOTVS
          </span>

          {!isMobile ? (
            <div className="flex items-center gap-4">
              {/* Navigation Routes */}
              {updatedRoutes.map((route) => (
                <DropdownMenu key={route.id}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="default"
                      onClick={() => setCurrentSubMenu(route.id ?? '')}
                    >
                      {route.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {route.children?.map((child) => (
                      <DropdownMenuItem key={child.path} asChild>
                        <Link
                          href={child.path}
                          onClick={() => setCurrentSubMenu(null)}
                        >
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}

              {/* User Menu or Login */}
              {isAuthenticated ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        {session?.user?.name || 'Usuário'}
                        {currentSubMenu ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link
                          href="/administrative/profile"
                          className="flex items-center gap-2"
                        >
                          <User className="h-4 w-4" /> Perfil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-600"
                      >
                        <LogOut className="h-4 w-4" /> Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <ModeToggle />
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => router.push('/signIn')}
                >
                  Login
                </Button>
              )}
            </div>
          ) : (
            <Button
              variant="default"
              size="icon"
              onClick={toggleSidebar(true)}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
        </div>
      </header>

      {/* Sidebar for Mobile */}
      {isMobile && (
        <>
          {openSidebar && (
            <div
              className="fixed inset-0 bg-black/50 z-10"
              onClick={toggleSidebar(false)}
              aria-hidden="true"
            />
          )}
          <div
            className={cn(
              'fixed inset-y-0 right-0 z-20 w-64 bg-white border-r shadow-lg transform transition-transform duration-300',
              openSidebar ? 'translate-x-0' : 'translate-x-full',
            )}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-sm italic text-gray-500">
                Integração TOTVS
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar(false)}
                aria-label="Close sidebar"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <SidebarList open={openSidebar} toggleSidebar={toggleSidebar} />
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;

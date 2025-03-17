'use client';

import { updatedRoutes } from '@/config/routes';
import { theme } from '@/styles/theme';
import {
  ArrowDropDown,
  ArrowDropUp,
  Logout,
  Menu as MenuIcon,
  Person,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DrawerList from './DrawerList';

const Navbar = () => {
  const { data: session } = useSession();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [subMenuEl, setSubMenuEl] = useState<null | HTMLElement>(null);
  const [currentSubMenu, setCurrentSubMenu] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const open = Boolean(anchorEl);
  const openSubMenu = Boolean(subMenuEl);

  const isAuthenticated = !!session?.user;

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubMenuEl(null);
    setCurrentSubMenu(null);
  };

  const handleSubMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    category: string,
  ) => {
    setSubMenuEl(event.currentTarget);
    setCurrentSubMenu(category);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/signIn');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Box sx={{ mr: '1rem' }}>
            <Link href="/">
              <Image
                src="/rubeus.svg"
                width={48}
                height={48}
                alt="logo-rubeus.svg"
              />
            </Link>
          </Box>
          <Typography
            variant="body1"
            color="textSecondary"
            component="span"
            sx={{ flexGrow: 1, fontStyle: 'italic' }}
          >
            Integração TOTVS
          </Typography>
          {!isMobile && (
            <>
              {updatedRoutes.map((route) => (
                <Box key={route.id} sx={{ mx: 1 }}>
                  <Button
                    id={`${route.id}-button`}
                    aria-controls={open ? `${route.id}-menu` : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(event) =>
                      handleSubMenuClick(event, route.id ?? '')
                    }
                    color="primary"
                    variant="contained"
                  >
                    {route.name}
                  </Button>
                  <Menu
                    anchorEl={subMenuEl}
                    open={openSubMenu && currentSubMenu === route.id}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': `${route.id}-button`,
                    }}
                  >
                    {route.children?.map((child) => (
                      <Link
                        href={child.path}
                        style={{ textDecoration: 'none' }}
                        key={child.path}
                      >
                        <MenuItem onClick={handleClose}>{child.name}</MenuItem>
                      </Link>
                    ))}
                  </Menu>
                </Box>
              ))}
              {isAuthenticated ? (
                <>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                    endIcon={!anchorEl ? <ArrowDropDown /> : <ArrowDropUp />}
                  >
                    {session?.user?.name || 'Usuário'}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    sx={{
                      '& .MuiMenu-paper': {
                        minWidth: '8dvw',
                      },
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <MenuItem
                      onClick={() => router.push('/administrative/profile')}
                      sx={{
                        display: 'flex',
                        gap: '1rem',
                        alignContent: 'center',
                        padding: '0.8rem',
                      }}
                    >
                      <Person /> Perfil
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      sx={{
                        display: 'flex',
                        gap: '1rem',
                        alignContent: 'center',
                        padding: '0.8rem',
                        color: theme.palette.error.main,
                      }}
                    >
                      <Logout /> Sair
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => router.push('/signIn')}
                >
                  Login
                </Button>
              )}
            </>
          )}
          {isMobile && (
            <>
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={openDrawer}
                onClose={toggleDrawer(false)}
              >
                <DrawerList open={openDrawer} toggleDrawer={toggleDrawer} />
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

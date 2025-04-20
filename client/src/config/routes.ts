type Route = {
  id?: string;
  path: string;
  name: string;
  prefix?: string;
  category?: string;
  children?: Route[];
};

const Routes: Route[] = [
  {
    id: 'automations',
    path: '/automations',
    name: 'Automações',
    prefix: 'automations',
    children: [
      {
        id: 'filters',
        path: '/filters',
        name: 'Filtros',
      },
      {
        id: 'totvs',
        path: '/totvs',
        name: 'TOTVS',
      },
      {
        id: 'validator',
        path: '/validator',
        name: 'Validador de JavaScript',
      },
    ],
  },
  {
    id: 'registers',
    name: 'Cadastros',
    path: '/registers',
  },
];

function buildRoutesWithPrefix(routes: Route[], parentPrefix = ''): Route[] {
  return routes.map((route) => {
    const fullPath = `${parentPrefix}${route.path}`;

    return {
      ...route,
      path: fullPath,
      children: route.children
        ? buildRoutesWithPrefix(route.children, fullPath)
        : undefined,
    };
  });
}

const updatedRoutes = buildRoutesWithPrefix(Routes, '/administrative');

export { updatedRoutes };

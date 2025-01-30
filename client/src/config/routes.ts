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
        id: 'dataservers',
        path: '/dataservers',
        name: 'DataServers',
        children: [
          {
            id: 'get-schema',
            path: '/get-schema',
            name: 'GetSchema',
          },
        ],
      },
      {
        id: 'sql',
        path: '/sql',
        name: 'Consultas SQL',
        children: [
          {
            id: 'read-record',
            path: '/read-record',
            name: 'ReadRecord',
          },
          {
            id: 'save-record',
            path: '/save-record',
            name: 'SaveRecord',
          },
          {
            id: 'read-view',
            path: '/read-view',
            name: 'ReadView',
          },
          {
            id: 'execute-sentence',
            path: '/sentence/execute',
            name: 'Execute',
          },
        ],
      },
      {
        id: 'workflow',
        path: '/workflow',
        name: 'Formulas Visuais',
        children: [
          {
            id: 'workflow-find-wall',
            path: '/findAll',
            name: 'FindAll',
          },
        ],
      },
    ],
  },
  {
    id: 'registers',
    name: 'Cadastros',
    path: '/registers',
    children: [
      {
        id: 'users',
        path: '/users',
        name: 'Usuários',
      },
      {
        id: 'tbc',
        path: '/tbc',
        name: 'TBC',
      },
    ],
  },
];

function buildRoutesWithPrefix(routes: Route[], parentPrefix = ''): Route[] {
  return routes.map((route) => {
    const fullPath = parentPrefix ? `${parentPrefix}${route.path}` : route.path;

    return {
      ...route,
      path: fullPath,
      children: route.children
        ? buildRoutesWithPrefix(route.children, fullPath)
        : undefined,
    };
  });
}

const updatedRoutes = buildRoutesWithPrefix(Routes);

export { updatedRoutes };

import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      login: string;
      token: string;
      changePassword: boolean;
      status: boolean;
    };
    token: string;
    id: string;
  }

  interface User extends User {
    id: string;
    name: string;
    login: string;
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    login: string;
    token: string;
    change_password: boolean;
    status: boolean;
    sessionId?: string;
  }
}

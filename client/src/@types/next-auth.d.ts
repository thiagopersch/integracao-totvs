import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      token: string;
      changePassword?: boolean;
      status?: boolean;
    };
    token: string;
    id: string;
  }

  interface User extends User {
    id: string;
    name: string;
    email: string;
    token: string;
    changePassword?: boolean;
    status?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    email: string;
    token: string;
    change_password?: boolean;
    status?: boolean;
    sessionId?: string;
  }
}

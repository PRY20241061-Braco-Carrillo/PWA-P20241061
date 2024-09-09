import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch('https://p20241061-d7438ce5a706.herokuapp.com/api/user/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data = await res.json();

          // Verificar si el login fue exitoso y el usuario no tiene el rol "ROLE_CLIENT"
          if (res.ok && data && data.code === 'SUCCESS' && !data.data.roles.includes('ROLE_CLIENT')) {
            return {
              id: data.data.userId,
              name: credentials?.email,
              roles: data.data.roles,
              token: data.data.token,
            };
          } else if (data.data.roles.includes('ROLE_CLIENT')) {
            throw new Error('No puedes iniciar sesión con este usuario');
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roles = user.data?.roles;
        token.token = user.data?.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',  // Página para mostrar errores
  },
};

export default auth;

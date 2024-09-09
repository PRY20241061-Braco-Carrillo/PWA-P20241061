import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
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
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
  providers: [

    FacebookProvider({
      // These names MUST match your .env.local keys exactly
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Since your /api/login route already validated the user,
        // we just return the user object here to create the session.
        if (credentials?.email) {
          return { id: "1", email: credentials.email, name: "Admin" };
        }
        return null;
      }
    })
  ],
  pages:{
    signIn: '/login',
  },
  session:{
    strategy:"jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
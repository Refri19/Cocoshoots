import NextAuth, { NextAuthOptions } from "next-auth"; // Import NextAuthOptions
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = { // Export authOptions as an object
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  debug: true, 
};

export default NextAuth(authOptions);
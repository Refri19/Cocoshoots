import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  // Optional: Custom pages to override default signin
  pages: {
    signIn: '/auth/signin', 
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
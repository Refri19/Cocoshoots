import NextAuth from "next-auth"
import facebookProvider from "next-auth/providers/facebook"
import {signIn} from "next-auth/react";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    facebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {params: { scope: "email public_profile" } },
    }),
    // ...add more providers here
  ],
  secret:process.env.NEXTAUTH_SECRET,
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook"

export const {handlers,signIn,signOut,auth}= NextAuth({
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
    ],  
    pages:{
        signIn:'/login',
    }
    })
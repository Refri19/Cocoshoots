import NextAuth from "next-auth"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/database"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
  adapter: MongoDBAdapter(clientPromise),
})
import NextAuth from "next-auth";
// Move up 4 levels to reach the root auth.ts
import { authOptions } from "../../../../auth"; 

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
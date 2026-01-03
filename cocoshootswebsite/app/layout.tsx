import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth";
import SessionWrapper from "./ui/components/SessionWrapper"; 
import ClientLayout from "./ClientLayout";
import "./globals.css";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionWrapper session={session}>
          <ClientLayout>{children}</ClientLayout>
        </SessionWrapper>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./Provider";
import { getServerSession } from "next-auth";
import LoginPage from "./@login/page";

const inter = Lato({ weight: ["400", "700", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gualu - CRM",
  description: "Gualu CRM V2",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  const isLoggedIn = Boolean(session?.user);

  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} h-full text-sm text-color-text overflow-hidden`}>
        <Providers>
          {isLoggedIn ? (
            <>
              <Navbar session={session}>{children}</Navbar>
            </>
          ) : (
            <LoginPage />
          )}
        </Providers>
      </body>
    </html>
  );
}

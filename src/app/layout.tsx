import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Providers from "./Provider";
import { getServerSession } from "next-auth";
import LoginPage from "./@login/page";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({ weight: ["400", "700", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ODIN - CRM",
  description: "ODIN CRM V2",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  const isLoggedIn = Boolean(session?.user);

  return (
    <ViewTransitions>
      <html lang="es" className="h-full">
        <body
          className={`${inter.className} bg-gray-200 h-full text-sm text-color-text overflow-hidden`}
        >
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
    </ViewTransitions>
  );
}

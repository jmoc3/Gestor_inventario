import { Quicksand } from "next/font/google";
import "./globals.css";
import NextuiProvider from "./nextuiprovider";
import { SessionProviderComponent } from "./providers/SessionProvider";

const inter = Quicksand({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextuiProvider>
        <SessionProviderComponent>
          <body className={inter.className}>{children}</body>
        </SessionProviderComponent>
      </NextuiProvider>
    </html>
  );
}

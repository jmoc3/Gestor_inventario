import { Quicksand } from "next/font/google";
import "./globals.css";
import NextuiProvider from "./nextuiprovider";
import SessionProviderComponent from "./providers/SessionProvider";

const inter = Quicksand({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">  
      <head>
        <title>LeBlonde</title>
        <link rel="icon" href="https://images.unsplash.com/photo-1722459154931-74de2a3acccc?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </head>
      <NextuiProvider>
        <SessionProviderComponent>
          <body className={inter.className}>{children}</body>
        </SessionProviderComponent>
      </NextuiProvider>
    </html>
  );
}

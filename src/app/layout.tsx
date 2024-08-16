import { Quicksand } from "next/font/google";
import "./globals.css";
import NextuiProvider from "./nextuiprovider";

const inter = Quicksand({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextuiProvider>
        <body className={inter.className}>{children}</body>
      </NextuiProvider>
    </html>
  );
}

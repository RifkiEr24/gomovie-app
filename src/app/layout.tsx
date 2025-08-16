import type { Metadata } from "next";
import { Roboto, Poppins, Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/common/providers/ReactQueryProviders";
import { Toaster } from "@/common/components/ui/sonner";
import Link from "next/link";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoMovie",
  description: "A movie discovery platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable} } antialiased`}>
        <header className="border-b">
          <div className="container mx-auto py-4 px-6 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              GoMovie
            </Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="hover:text-blue-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/watchlist" className="hover:text-blue-600">
                    Watchlist
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <ReactQueryProvider>
          <main className="container mx-auto py-6 px-6">
  {children}
          </main>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

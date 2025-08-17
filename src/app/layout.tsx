import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/common/providers/ReactQueryProviders";
import { Toaster } from "@/common/components/ui/sonner";
import Navbar from "@/common/Navbar";
import WatchlistProvider from "@/modules/watchlist/providers/WatchlistProvider";

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
      <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
        <Navbar />
        <ReactQueryProvider>
          <WatchlistProvider>
            <main className="container mx-auto py-6 px-6">
              {children}
            </main>
          </WatchlistProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

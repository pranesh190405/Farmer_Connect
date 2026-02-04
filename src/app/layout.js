import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import OfflineBanner from "@/components/ui/OfflineBanner/OfflineBanner";
import BottomNav from "@/components/ui/BottomNav/BottomNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Digital Agri Market",
  description: "Digital Agricultural Marketplace connecting farmers and buyers",
  manifest: "/manifest.json",
  themeColor: "#16a34a",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#16a34a" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <OfflineBanner />
          {children}
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
